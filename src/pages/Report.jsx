import { useEffect } from "react";
import { Link } from "react-router-dom";
import WorkasanaLayout from "../components/WorkasanaLayout";
import apiClient from "../utils/customAxios";

const Report = () => {

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await apiClient.get(`api/reports/last-week`);
            console.log('Reports, ',response.data);
        }
        fetchData();
    },[])

    return(
        <WorkasanaLayout heading={'Workasana Reports'} >
              <div className="grid gap-8 grid-cols-12" >
            <div className="border shadow-md bg-secondary-light shadow-primary-light sticky col-span-4 max-h-fit" >
                <div className="p-6 flex flex-col text-xl" >
                  <Link className="bg-secondary py-2 mb-2 px-8 rounded-lg" to={'/dashboard'} >Back to dashboard</Link>   
                </div>
            </div>
            <div className="border shadow-md bg-secondary-light overflow-y-auto max-h-fit  shadow-primary-light col-span-8" >
                <div className="p-6 text-xl" >
                    <div className="flex justify-center items-center" >
                    <h1 className="text-2xl" >Report Overview</h1>
                    </div>
                </div>
            </div>
        </div>
        </WorkasanaLayout>
      
    )
}

export default Report;