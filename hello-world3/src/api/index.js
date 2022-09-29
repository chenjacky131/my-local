import axios from '@/utils/axiosInstance.js';
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOjUzMiwiYWNjb3VudE5hbWUiOiJ6bmNiIiwicGhvbmUiOiIxMzE1NDI2NjcyMCIsImNvbXBhbnlOYW1lIjoi5pm66IO96Ii56Ii25rWL6K-VIiwiaXNzIjoidHciLCJpc1N1cGVyQWRtaW4iOmZhbHNlLCJpc0FkbWluIjp0cnVlLCJ1c2VyTmFtZSI6IuaZuuiDveiIueiItiIsInRpdGxlIjoi6L-Z5piv55yf55qE5piv5LiA5Liq5pyJ5Y2B5YWt5Liq5a2X55qE6ZW_5qCH6aKYIiwiZXhwIjoxNjYzMjU0MDkzLCJ1c2VySWQiOjIyNSwidG9rZW4iOiJVeXNzWGNrdm9RWT0ifQ.0rtawvzWtHvFPXZI4nIR6AmXUh2Xzk1RuBTtHxUUDaw"
export const login = () =>  axios.post('api/PERSONAL/personal/loginJwt',
  {
    pwd: "Z#ncb9622$",
    userName: "zncb"
  }); 