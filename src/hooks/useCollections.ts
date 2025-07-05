import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface Collection {
    "id": number
    "title": string
}


const useCollections = () => {
    const fetchCollections = () => axios.get<Collection[]>('http://127.0.0.1:8000/store/collections/')
    .then(res => res.data)

    return useQuery<Collection[], Error>({
        queryKey: ['collections'],
        queryFn: fetchCollections
    })
}
export default useCollections