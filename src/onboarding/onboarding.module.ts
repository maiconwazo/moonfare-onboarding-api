import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { OnboardingController } from './onboarding.controller';
import { onboardingProviders } from './onboarding.providers';
import { OnboardingService } from './onboarding.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OnboardingController],
  providers: [OnboardingService, ...onboardingProviders],
})
export class OnboardingModule {}
