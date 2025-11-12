import { Controller, Module, Get, Post, Body, Query, Req, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger'
import { Api_Get } from '@src/plugins/Api_Get'
import { Api_group } from '@src/plugins/Api_group'

// dto
import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsNotEmptyObject, IsString, Min, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'


// db
import { db1 as db } from '@src/v1/zoom_prisma/db_prisma_1'

@Api_group('test', '测试数据库')
export class test_db {
    @Api_Get('用户')
    async user() {

        const user_list = await db.user.findMany()
        return { code: 200, msg: '成功:用户', result: {user_list} }
    }
}

@Module({
    controllers: [test_db],
    providers: [],
})
export class test_db_module { }
