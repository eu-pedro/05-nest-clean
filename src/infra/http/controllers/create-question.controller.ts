import { Controller, Post, UseGuards, Req, Body, BadRequestException } from "@nestjs/common";
import { JwtAuthGuard } from "@/infra/auth/jwt.auth.guard";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";


const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string()
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>


@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {

  constructor(private createQueston: CreateQuestionUseCase) { }

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload) {
    const { content, title } = body
    const userId = user.sub

    const result = await this.createQueston.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: []
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}