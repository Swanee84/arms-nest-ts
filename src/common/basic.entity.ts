import { Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'

export default abstract class BasicEntity extends BaseEntity {
  @Column()
  status!: string // 상태
  @Column()
  createdId?: number // 등록 계정
  @Column()
  updatedId?: number // 수정 계정

  @CreateDateColumn()
  createdAt?: Date // 등록 일시
  @UpdateDateColumn()
  updatedAt?: Date // 수정 일시
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
