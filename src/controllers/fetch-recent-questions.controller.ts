import { Controller, UseGuards, Get, Query } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt.auth.guard";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";

const pageQueryParamSchema = z.string().optional().default('1').transform(Number).pipe(z.number().min(1))


const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type QueryValidationPipe = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {

  constructor(private prisma: PrismaService ){}

 @Get()
 async handle(@Query('page', queryValidationPipe) page: QueryValidationPipe) {
  const perpage = 1

  const questions = await this.prisma.question.findMany({
    take: perpage,
    skip: (page - 1) * perpage,
    orderBy: {
      createdAt: 'desc'
    },
  })

  return { questions }

 }


}