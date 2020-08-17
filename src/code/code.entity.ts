import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Index } from 'typeorm'
import BasicEntity from '../common/basic.entity'
import { JoinColumn } from 'typeorm/index'

@Entity('code_group')
@Index(['academyId', 'groupCode'])
export class CodeGroupEntity extends BasicEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '코드 그룹 계정' })
  id!: number

  @Column({ type: 'int', nullable: false, comment: '학원 계정' })
  academyId!: number

  @Column({ type: 'varchar', length: 16, nullable: false, comment: '그룹 코드' })
  @Index()
  groupCode!: string

  @Column({ type: 'varchar', length: 50, nullable: false, comment: '그룹 코드 이름' })
  groupCodeName!: string

  @OneToMany((type) => CodeDetailEntity, (codeDetail) => codeDetail.codeGroup)
  // @JoinColumn({ referencedColumnName: 'group_code', name: 'group_code' })
  detailCodeList!: CodeDetailEntity[]
}

@Entity('code_detail', { orderBy: { sort: 'ASC' } })
@Index(['academyId', 'detailCode'])
@Index(['academyId', 'groupCode', 'detailCode', 'status'])
export class CodeDetailEntity extends BasicEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '코드 상세 계정' })
  id!: number

  @Column({ type: 'int', nullable: false, comment: '학원 계정' })
  academyId!: number

  @Column({ type: 'int', nullable: false, comment: '코드 그룹 계정' })
  codeGroupId!: number

  @Column({ type: 'varchar', length: 16, nullable: false, comment: '그룹 코드' })
  groupCode!: string

  @Column({ type: 'varchar', length: 16, nullable: false, comment: '상세 코드' })
  detailCode!: string

  @Column({ type: 'varchar', length: 50, nullable: false, comment: '상세 코드 이름' })
  detailCodeName?: string

  @Column({ type: 'varchar', length: 16, nullable: false, comment: '값 1' })
  value1?: string

  @Column({ type: 'varchar', length: 16, nullable: false, comment: '값 2' })
  value2?: string

  @Column({ type: 'varchar', length: 16, nullable: false, comment: '값 3' })
  value3?: string

  @Column({ type: 'int', nullable: true, comment: '정렬' })
  sort?: number

  @ManyToOne((type) => CodeGroupEntity, (codeGroup) => codeGroup.detailCodeList, { cascade: true })
  // @JoinColumn({ referencedColumnName: 'groupCode', name: 'group_code' })
  @JoinColumn({ name: 'code_group_id' })
  codeGroup!: CodeGroupEntity
}

export interface SearchCode {
  academyId?: number
  groupCodeId?: number
  groupCode?: string
  detailCodeId?: number
  detailCode?: string
}
