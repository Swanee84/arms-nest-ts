import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm'
import BasicEntity, { IBasic, IBasicSearch } from '../common/basic.entity'
import * as argon2 from 'argon2'

@Entity('user')
export default class UserEntity extends BasicEntity {
  @PrimaryGeneratedColumn()
  id!: number // 사용자 계정

  @Column()
  email!: string // 이메일

  @Column()
  password?: string // 비밀번호

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password)
  }

  @Column()
  name!: string // 이름

  @Column()
  phoneNo?: string // 휴대폰 번호

  @Column()
  birthday?: Date // 생일

  @Column()
  role!: string // 권한

  getInterface(): IUser {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      phoneNo: this.phoneNo,
      birthday: this.birthday,
      role: this.role,
      status: this.status,
      createdAt: this.createdAt,
      createdId: this.createdId,
      updatedAt: this.updatedAt,
      updatedId: this.updatedId,
    }
  }
}

export interface IUser extends IBasic {
  id: number
  email?: string
  name?: string
  phoneNo?: string
  birthday?: Date
  role: string
}

export interface SearchUser extends IBasicSearch {
  id?: number
  email?: string
  name?: string
  phoneNo?: string
  birthday?: string
  role: string
}
