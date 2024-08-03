import { Controller, UseGuards, Get, Query } from "@nestjs/common";
import { JwtAuthGuard } from "@/infra/auth/jwt.auth.guard";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions";
import { QuestionPresenter } from "../presenter/question-presenter";

const pageQueryParamSchema = z.string().optional().default('1').transform(Number).pipe(z.number().min(1))


const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type QueryValidationPipe = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {

  constructor(private fetchRecentQuestions: FetchRecentQuestionsUseCase ){}

 @Get()
 async handle(@Query('page', queryValidationPipe) page: QueryValidationPipe) {

 const result = await this.fetchRecentQuestions.execute({
  page
 })

 if(result.isLeft()) {
  throw new Error()
 }

 const questions = result.value.questions

  return { questions: questions.map(QuestionPresenter.toHttp) }

 }


}