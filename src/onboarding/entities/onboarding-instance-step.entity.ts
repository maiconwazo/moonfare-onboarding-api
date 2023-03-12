import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { FlowStepEntity } from './onboarding-flow-step.entity';
import { FlowEntity } from './onboarding-flow.entity';
import { InstanceEntity } from './onboarding-instance.entity';

@Entity('instance_step')
export class InstanceStepEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @PrimaryGeneratedColumn('uuid')
  public instanceId: string;

  @PrimaryGeneratedColumn('uuid')
  public flowId: string;

  @PrimaryGeneratedColumn('uuid')
  public flowStepId: string;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;

  @ManyToOne(() => InstanceEntity, (instance) => instance.steps)
  public instance: InstanceEntity;

  @ManyToOne(() => FlowStepEntity, (flowStep) => flowStep.instanceSteps)
  public flowStep: FlowStepEntity;
}
