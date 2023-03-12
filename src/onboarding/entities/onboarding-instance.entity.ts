import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';
import { FlowEntity } from './onboarding-flow.entity';
import { InstanceStepEntity } from './onboarding-instance-step.entity';

@Entity('instance')
export class InstanceEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @PrimaryGeneratedColumn('uuid')
  public flowId: string;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;

  @ManyToOne(() => FlowEntity, (flow) => flow.instances)
  public flow: FlowEntity;

  @OneToMany(() => InstanceStepEntity, (step) => step.instance)
  public steps: InstanceStepEntity[];
}
