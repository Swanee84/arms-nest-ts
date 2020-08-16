import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import BasicEntity from '../common/basic.entity'
import { JoinColumn } from 'typeorm/index'

@Entity('code_group')
export class CodeGroupEntity extends BasicEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  academyId!: number

  @Column()
  groupCode!: string

  @Column()
  groupCodeName!: string

  @OneToMany((type) => CodeDetailEntity, (codeDetail) => codeDetail.codeGroup)
  @JoinColumn({ referencedColumnName: 'group_code', name: 'group_code' })
  detailCodeList!: CodeDetailEntity[]
}

@Entity('code_detail')
export class CodeDetailEntity extends BasicEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  academyId!: number

  @Column()
  groupCode!: string

  @Column()
  detailCode!: string

  @Column()
  detailCodeName?: string

  @Column()
  value1?: string

  @Column()
  value2?: string

  @Column()
  value3?: string

  @Column()
  sort?: number

  @ManyToOne((type) => CodeGroupEntity, (codeGroup) => codeGroup.detailCodeList)
  @JoinColumn({ referencedColumnName: 'groupCode', name: 'group_code' })
  codeGroup!: CodeGroupEntity
}

export interface SearchCode {
  academyId?: number
  groupCodeId?: number
  groupCode?: string
  detailCodeId?: number
  detailCode?: string
}
