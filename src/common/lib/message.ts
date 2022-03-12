import { InternalServerErrorException } from '@nestjs/common'

const messages = {
    inserted: ':attribute با موفقیت ثبت شد',
    updated: ':attribute با موفقیت بروز شد',
    deleted: ':attribute با موفقیت حذف گردید',
}

const attributes = {
    rial: 'قیمت ریال',
    tokens: 'توکن‌ها با موفقیت بروز شدند',
}

export default function (string: string): string {
    const [attribute, message] = string.toLowerCase().split('.')
    if (!attribute || !message) {
        throw new InternalServerErrorException('Message module: Property string is invalid')
    }
    if (!attributes.hasOwnProperty(attribute)) {
        throw new InternalServerErrorException('Message module: The attribute does not found!')
    }
    if (!messages.hasOwnProperty(message)) {
        throw new InternalServerErrorException('Message module: The message does not found!')
    }
    return messages[message].replace(':attribute', attributes[attribute])
}
