import { Controller, Post, UseGuards, Req } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt.auth.guard";
import type { Request } from 'express'
import { CurrentUser } from "src/auth/current-user-decorator";
import { JwtStrategy } from "src/auth/jwt.strategy";

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {

  constructor(){}

 @Post()
 async handle(@CurrentUser() user: JwtStrategy) {
    console.log(user)
    return 'ok'
  }
}