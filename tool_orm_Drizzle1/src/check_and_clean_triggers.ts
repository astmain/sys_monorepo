import { db_client } from "./db"

async function check_and_clean_triggers() {
    try {
        console.log("检查数据库中的触发器...")

        // 查询所有触发器
        const triggers = await db_client`
            SELECT 
                trigger_name,
                event_object_table,
                action_statement
            FROM information_schema.triggers
            WHERE event_object_schema = 'public'
            AND event_object_table = 'tb_account'
        `

        console.log(`找到 ${triggers.length} 个触发器:`)
        triggers.forEach((trigger: any) => {
            console.log(`  - ${trigger.trigger_name} (表: ${trigger.event_object_table})`)
        })

        // 删除所有 tb_account 表的触发器
        if (triggers.length > 0) {
            console.log("\n开始删除触发器...")
            for (const trigger of triggers) {
                const trigger_name = trigger.trigger_name
                console.log(`  删除触发器: ${trigger_name}`)
                await db_client.unsafe(`DROP TRIGGER IF EXISTS ${trigger_name} ON tb_account`)
            }
            console.log("触发器删除完成")
        } else {
            console.log("没有找到需要删除的触发器")
        }

        // 检查是否有相关的函数需要删除
        const functions = await db_client`
            SELECT 
                routine_name
            FROM information_schema.routines
            WHERE routine_schema = 'public'
            AND routine_name LIKE '%update_timestamp%'
        `

        if (functions.length > 0) {
            console.log(`\n找到 ${functions.length} 个相关函数:`)
            functions.forEach((func: any) => {
                console.log(`  - ${func.routine_name}`)
            })

            console.log("\n开始删除函数...")
            for (const func of functions) {
                const func_name = func.routine_name
                console.log(`  删除函数: ${func_name}`)
                await db_client.unsafe(`DROP FUNCTION IF EXISTS ${func_name}() CASCADE`)
            }
            console.log("函数删除完成")
        }

        console.log("\n清理完成！")
    } catch (error) {
        console.error("清理失败:", error)
        throw error
    } finally {
        await db_client.end()
    }
}

// 如果直接运行此文件
if (require.main === module) {
    check_and_clean_triggers()
        .then(() => {
            console.log("操作成功")
            process.exit(0)
        })
        .catch((error) => {
            console.error("操作失败:", error)
            process.exit(1)
        })
}

