# MomProject
​
## Description
​
MomProject is an api express to allow users to purchase items on a storefront, creating orders, and backend for a special user to manage orders.
​
## MVP
​
- Special user (ID given as an environmental variable) can create items for the storefront
- Users can register and create orders on items
- Orders show up on special endpoint for special user
- Special user can edit orders
- Users can see their orders and statuses
​
## Backlog
​
- create auth routes
- create item routes
- create order routes
- test each with postman
​
## Data Structure
​
# auth.js
​
- User (email, passHash, name, address, cellphone)
- createUser () {}
- loginUser () {}
- logoutUser () {}
​
# item.js
​
- Item (name, description, image, price) {}
- createItem()
- editItem()
- removeItem()
- listItems()
​
# order.js 
​
- Order (userId, itemId, isPaid, isShipped)
- createOrder () {}
- editOrder () {}
- deleteOrder () {}
- listOrders () {}
- listOrdersForUser () {}
​
## Routes

| Method | Path | Description |
|--------|------|-------------|
| `get`  | `/user/:userId` | get user's details (admin only) |
| `post` | `/auth/login` | returns if the user is logged in or not |
| `post` | `/auth/signup` | redirects to / if user logged in |
| `post` | `/auth/logout` | logout |
| `get`  | `/user/orders` | get orders for logged in user |
| `get`  | `/items` | get all items |
| `post`  | `/items` | create new item (admin only) |
| `post`  | `/items/:id` | edit item (admin only) |
| `post`  | `/items/:id/delete` | delete item (admin only) |
| `post`  | `/items/order` | create order for logged in user |
| `get`  | `/orders` | get all orders |
| `post`  | `/orders/:id` | edit order (admin only) |
| `post`  | `/orders/:id/delete` | delete order (admin only) |

​
## Links
​
### Trello
[Link url](https://trello.com/b/CWviY2zv/kraken-brigade-project)
​
### Git
URls for the project repo and deploy
[Link Repo](https://github.com/jorgeberrizbeitia/kraken-brigade)
[Link Deploy](https://jorgeberrizbeitia.github.io/kraken-brigade/)
​
### Slides
URls for the project presentation (slides)
[Link Slides.com](https://docs.google.com/presentation/d/138o01hAz-0gXepN78RsDgse12HiiuN7Fz_N_hJnI9_g/edit?usp=sharing)   