import { Column, CreateDateColumn, UpdateDateColumn, BaseEntity, Index } from 'typeorm'

export default abstract class BasicEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 16, nullable: true, comment: '상태' })
  status!: string
  @Column({ type: 'int', nullable: true, comment: '등록 계정' })
  createdId?: number
  @Column({ type: 'int', nullable: true, comment: '수정 계정' })
  updatedId?: number

  @CreateDateColumn({ type: 'datetime', nullable: true, comment: '등록 일시' })
  @Index()
  createdAt?: Date
  @UpdateDateColumn({ type: 'datetime', nullable: true, comment: '수정 일시' })
  updatedAt?: Date
}

export interface IBasic {
  status?: string
  createdId?: number
  updatedId?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface IBasicSearch {
  current: number
  pageSize: number
  status: string
}
