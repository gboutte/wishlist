import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { IS_INSTALL_KEY } from '../decorators/install.decorator';

@Injectable()
export class InstalledJwtGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isInstalled: boolean =
      (await this.usersService.getNumberOfUsers()) > 0;

    const isInstallation: boolean = this.reflector.get<boolean>(
      IS_INSTALL_KEY,
      context.getHandler(),
    );

    const accessWithoutJwt = (isInstallation && !isInstalled) || isPublic;

    if (accessWithoutJwt) {
      return true;
    }

    if (isInstalled && isInstallation) {
      return false;
    }

    // Check if the result is an Observable
    const result = super.canActivate(context);

    if (result instanceof Observable) {
      // Convert the Observable to a Promise
      const observableResult = result;
      return new Promise<boolean>((resolve) => {
        observableResult.subscribe((value) => {
          resolve(value);
        });
      });
    }

    // If it's not an Observable, simply return the result
    return result;
  }
}
