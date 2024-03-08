import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    const args = ctx.getArgs();

    console.log(
      `GraphQL ${info.operation.operation}, Field: ${
        info.fieldName
      }, Args: ${JSON.stringify(args)}`,
    );

    return ctx.getContext().req;
  }
}
