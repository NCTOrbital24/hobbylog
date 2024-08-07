import { backendLink } from "@/constants/constants";

const fetchImage = (uri: string) => {
    return `${backendLink}/api/image/${uri}`;
}

export default fetchImage;