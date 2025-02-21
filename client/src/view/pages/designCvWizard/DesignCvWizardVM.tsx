// import { useEffect, useState } from "react"

// //ViewModel
// export function useApp(){
//     const [count, setCount] = useState(0);
//     const [dog, setDog] = useState({message:"", status:""});
    

//     useEffect(() => {
//         console.log("useEffect 2")
//         fetch("https://dog.ceo/api/breeds/image/random")
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data)
//                 setDog(data)
//             })
//             .catch((err) => console.log(err))
//     }, [])

//     function test{
//         console.log("test function")
//         setCount(count + 1)
//     }

//     return {
//         dog,
//         count,
//         setCount,test
//     }
// }