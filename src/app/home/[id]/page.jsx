// src/app/home/[id]/page.js
import Image from 'next/image';

const getUserById = async (id) => {
    const res = await fetch('https://670e3a38073307b4ee45facf.mockapi.io/users');
    if (!res.ok) {
        throw new Error('fetch user error!');
    }
    const users = await res.json();
    return users.find(user => user.id === id);
};

const Page = async ({ params }) => {
    const user = await getUserById(params.id); // ดึงข้อมูลผู้ใช้ตาม ID

    return (
        <div>
            <h1>ชื่อ: {user.name}</h1>
            <h2>อายุ: {user.age}</h2>
            <p>createdAt: {user.createdAt}</p>
            <Image
                src={user.avatar}
                width={500}
                height={500}
                alt="Picture of the author"
            />
        </div>
    );
};

export default Page;
