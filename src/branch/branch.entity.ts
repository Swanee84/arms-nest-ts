import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index } from 'typeorm'
import BasicEntity, { IBasicSearch } from '../common/basic.entity'
import AcademyEntity from '../academy/academy.entity'
import { OneToOne } from 'typeorm/index'
import UserEntity from '../user/user.entity'

@Entity('branch')
@Index(['academyId', 'status'])
export default class BranchEntity extends BasicEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '지점 계정' })
  id!: number

  @Column({ type: 'int', nullable: false, comment: '학원 계정' })
  academyId!: number

  @Column({ type: 'varchar', length: 50, nullable: false, comment: '이름' })
  @Index()
  name!: string

  @Column({ type: 'int', nullable: false, comment: '지점 원장 사용자 계정' })
  @Index()
  userId!: number

  @Column({ type: 'date', nullable: true, comment: '지점 오픈일' })
  incorporation?: Date

  @Column({ type: 'varchar', length: 100, nullable: false, comment: '주소' })
  address?: string

  @Column({ type: 'varchar', length: 16, nullable: false, comment: '학원 폰 번호' })
  @Index()
  phoneNo?: string

  @ManyToOne((type) => AcademyEntity, (academy) => academy.branchList, { cascade: true })
  @JoinColumn({ name: 'academy_id' })
  academy!: AcademyEntity

  @ManyToOne((type) => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity
}

export interface SearchBranch extends IBasicSearch {
  id?: number
  academyId?: number
  name?: string
  userId?: number
  incorporation?: string
  address?: string
  phoneNo: string
}
