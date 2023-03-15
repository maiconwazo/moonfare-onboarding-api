import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from 'src/database.module';
import { OnboardingController } from './onboarding.controller';
import { onboardingProviders } from './onboarding.providers';
import { OnboardingService } from './onboarding.service';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'DOCUMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'documents_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [OnboardingController],
  providers: [OnboardingService, ...onboardingProviders],
})
export class OnboardingModule {}
