import React, { useEffect, useState } from 'react'
import AddReward from '../../../../components/sandeep/loyalty/settings/AddReward'
import AddPointConditions from '../../../../components/sandeep/loyalty/settings/AddPointConditions'
import demandAxios from "../../../../BaseURL";

function LoyaltySetting() {

    const [conditions, setConditions] = useState({ purchasing: [], actions: [] });
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await demandAxios.get('loyalty/conditions/all'); // Adjust the endpoint if necessary
        if (response.status === 200) {
          setConditions(response.data.conditions); // Set the conditions state with fetched data
        } else {
          console.error('Failed to fetch conditions:', response.data.error);
        }

        const rewardsResponse = await demandAxios.get('loyalty/rewards'); // Adjust the endpoint if necessary
        console.log(rewardsResponse)
        if (rewardsResponse.status === 200) {
          setRewards(rewardsResponse.data);
        } else {
          console.error('Failed to fetch rewards:', rewardsResponse.data.error);
        }
      } catch (error) {
        console.error('Error fetching conditions:', error);
      } finally {
        setLoading(false); // Stop loading once the fetch is complete
      }
    };

    fetchConditions();
  }, []);

  // Show a loading indicator while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div><h1>Loyalty Setting</h1></div>
    <AddPointConditions conditions={conditions}/>
    <AddReward rewards={rewards}/>
    </>
  )
}

export default LoyaltySetting