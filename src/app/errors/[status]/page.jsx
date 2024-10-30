import Error403 from "@/components/features/errors/403";
import Error404 from "@/components/features/errors/404";
import Error500 from "@/components/features/errors/500";
import Failed from "@/components/features/errors/Failed";


const page = ({ params }) => {

    const { status } = params

    if (status === '403') {
        return <Error403 />
    } else if (status === '404') {
        return <Error404 />
    } else if (status === '500') {
        return <Error500 />
    } else {
        return <Failed />
    }


}

export default page