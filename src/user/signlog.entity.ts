import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, Index, CreateDateColumn } from 'typeorm'

@Entity('sign_log')
@Index(['academyId', 'branchId', 'userId'])
@Index(['academyId', 'branchId', 'lastSignAt'])
@Index(['lastSignAt', 'academyId', 'branchId', 'userId'])
@Index(['lastSignAt', 'userId'])
export class SignLog extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '로그인 기록 계정' })
  id!: number

  @Column({ type: 'int', nullable: false, comment: '학원 계정' })
  academyId!: number

  @Column({ type: 'int', nullable: false, comment: '지점 계정' })
  branchId!: number

  @Column({ type: 'int', nullable: false, comment: '사용자 계정' })
  userId!: number

  @Column({ type: 'varchar', length: 16, nullable: false, comment: '로그인 종류', default: 'SIGN_IN' })
  @Index()
  category?: string

  @Column({ type: 'date', nullable: true, comment: '로그인 일', default: () => 'CURRENT_DATE' })
  @Index()
  signDate?: Date // 학원 설립일

  @Column({ type: 'time', nullable: true, comment: '로그인 시간', default: () => 'CURRENT_TIME' })
  signTime?: string // 학원 설립일

  @CreateDateColumn({ type: 'datetime', nullable: true, comment: '마지막 로그인 일시' })
  @Index()
  lastSignAt?: string // 학원 설립일
}
