'use server'
const { cookies } = require("next/headers");
const { NextResponse } = require("next/server");


export async function GET() {
    const cookiesStore = cookies();

    // ดึงรายการคุกกี้ทั้งหมดแล้วทำการลบทีละตัว
    cookiesStore.getAll().forEach(cookie => {
        cookiesStore.set(cookie.name, '', { expires: new Date(0) });
    });
    return NextResponse.next();
}