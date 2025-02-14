import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaQuestionsAttachmentsRepository } from "./prisma/repositories/prisma-questions-attachments-repository";
import { PrismaQuestionsCommentsRepository } from "./prisma/repositories/prisma-questions-comments-repository";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answer-attachments-repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answer-comments-repository";
import { PrismaAnswersRepository } from "./prisma/repositories/prisma-answers-repository";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions-repository";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { StudentsRepository } from "@/domain/forum/application/repositories/students-repository";
import { PrismaStudentsRepository } from "./prisma/repositories/prisma-student-repository";

@Module({
  providers: [PrismaService, PrismaQuestionsAttachmentsRepository, PrismaQuestionsCommentsRepository, PrismaAnswerAttachmentsRepository, PrismaAnswerCommentsRepository, PrismaAnswersRepository, {
    provide: QuestionsRepository,
    useClass: PrismaQuestionsRepository
  },
  {
    provide: StudentsRepository,
    useClass: PrismaStudentsRepository
  }
],
  exports: [PrismaService, PrismaQuestionsAttachmentsRepository, PrismaQuestionsCommentsRepository, PrismaAnswerAttachmentsRepository, PrismaAnswerCommentsRepository, PrismaAnswersRepository, QuestionsRepository, StudentsRepository]
})
export class DatabaseModule {}  