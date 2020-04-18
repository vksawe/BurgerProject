import axios from 'axios'

const instance=axios.create({
    baseURL:"https://burger-project-f4a00.firebaseio.com/"
})

export default instance;