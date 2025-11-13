import { Controller, Module, Get, Post, Body, Query, Req, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger'
import { Api_Get } from '@src/plugins/Api_Get'
import { Api_group } from '@src/plugins/Api_group'

// dto
import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsNotEmptyObject, IsString, Min, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { util_uuid9 } from '@src/plugins/util_uuid9'
// db

import { db_typeorm } from 'tool_db'
import { tb_user } from 'tool_db'

@Api_group('test', '测试_typeorm')
export class test_typeorm {
  @Api_Get('新增')
  async create() {
    // const one = await db_typeorm.save(new tb_user({ name: '测试名称', password: '123456' }))
    const user = new tb_user({ name: '测试名称', password: '123456' })
    const one = await db_typeorm.save(user)
    return { code: 200, msg: '成功:新增', result: { one } }
  }

  @Api_Get('更新')
  async update() {
    // 使用typeorm更新数据
    const user = await db_typeorm.findOne(tb_user, { where: { id: '563a91d6-0473-4bf0-8def-68622d58137c' } })
    user.name = '测试名称2'
    const one = await db_typeorm.save(user)
    return { code: 200, msg: '成功:更新', result: { one } }
  }

  @Api_Get('查询')
  async find() {
    const user = await db_typeorm.find(tb_user, { where: { id: '563a91d6-0473-4bf0-8def-68622d58137c' } })
    return { code: 200, msg: '成功:查询', result: { user } }
  }
}

@Module({
  controllers: [test_typeorm],
  providers: [],
})
export class test_typeorm_module {}
