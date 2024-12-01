import { useEffect } from "react";
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
            <div>
            <h1>Report</h1>
            </div>
        </WorkasanaLayout>
      
    )
}

export default Report;