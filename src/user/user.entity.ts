import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import BasicEntity from '../common/basic.entity'

@Entity('user')
export default class UserEntity extends BasicEntity {
  @PrimaryGeneratedColumn()
  id!: number // 사용자 계정

  @Column()
  email!: string // 이메일

  @Column()
  password?: string // 비밀번호

  @Column()
  name!: string // 이름

  @Column()
  phoneNo?: string // 휴대폰 번호

  @Column()
  birthday?: Date // 생일

  @Column()
  role!: string // 권한
}
