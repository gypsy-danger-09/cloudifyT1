import { useState } from "react"
import axios from 'axios'

export default () => {
    const [formData,setFormData] = useState({
            name:'',
            description:'',
            startDate:'',
            endDate:''
    })
    const token = 'my_token'
    const config ={headers : {
            Authorization : `Bearer ${token}`
    }}

    function changeHandler(e){
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    async function submitForm(formData){
        try {
            let res = await axios.post('https://api.trello.com/1/cards',{
                name: formData.name,
                description: formData.description,
                startDate: new Date(formData.startDate),
                endDate: new Date(formData.endDate)
        },
        config)            
            console.log('Success',res.data)
        }
        catch(ex){
            console.log('Error',ex)
        }
    }

    function handleSubmit(e){
        e.preventDefault()
    }

    return <div className="form" onSubmit={handleSubmit}>
            <form>
            <p>
                <label>Name : <input type="text" name="name" value={formData.name} placeholder="Enter your Name"
				onChange={changeHandler} ></input>
	            </label>
            </p>
            <p>
	            <label>Description : <input type="text" name="description" placeholder="Enter description of task"
                                 value={formData.description} 
                                onChange={changeHandler}></input>
	            </label>
            </p>
            <p>
	            <label>Start Date : <input type="date" name="startDate" 
                            value={formData.startDate} 
                            onChange={changeHandler}></input>
	            </label>
            </p>
            <p>
	            <label>End Date : <input type="date" name="endDate"
							value={formData.endDate} 
                            onChange={changeHandler}></input>
	            </label>
            </p>
            <button type="submit" onClick={submitForm}>Submit</button>
            </form>
    </div>
}