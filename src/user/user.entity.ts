import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn, Index } from 'typeorm'
import BasicEntity, { IBasic, IBasicSearch } from '../common/basic.entity'
import * as argon2 from 'argon2'

@Entity('user')
@Index(['email', 'status'])
export default class UserEntity extends BasicEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '사용자 계정' })
  id!: number

  @Column({ type: 'int', nullable: false, comment: '이메일' })
  @Index()
  email!: string

  @Column({ type: 'varchar', length: 200, nullable: false, comment: '비밀번호' })
  password?: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password)
  }

  @Column({ type: 'varchar', length: 50, nullable: false, comment: '이름' })
  @Index()
  name!: string

  @Column({ type: 'varchar', length: 16, nullable: true, comment: '휴대폰 번호' })
  @Index()
  phoneNo?: string

  @Column({ type: 'date', nullable: true })
  @Index()
  birthday?: Date // 생일

  @Column({ type: 'varchar', length: 16, nullable: false, comment: '사용자 권한' })
  role!: string // 권한

  @Column({ type: 'datetime', nullable: true, comment: '마지막 로그인 일시' })
  @Index()
  lastSignAt?: string

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
