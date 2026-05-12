# Implementation Notes

## Open-Scope Features
For this project, I chose to implement the following directions to enhance the dashboard's utility:

1. **Analytical Stats Header:** 
   - **Why:** A heatmap alone provides visual density, but a manager needs hard numbers (Revenue, Occupancy %, Volume) to make business decisions. Adding these metrics turns the calendar into a functional management tool.
2. **Global Status Filtering:** 
   - **Why:** Real-world data is noisy. By adding a top-down filter for booking statuses (Confirmed, Checked In, etc.), users can "drill down" into specific data segments without cluttering the view.

## Technical Trade-offs
1. **Native Mouse Event Loop:** 
   - I opted to use native `onMouseDown`, `onMouseEnter`, and `onMouseUp` events instead of standard React state toggles for the drag-selection. While this increases code complexity, it ensures a 0-lag, high-performance interaction that feels fluid even with large datasets.
2. **Reducer-based Selection Logic:** 
   - Managing a multi-step selection (start, drag, normalize range) can quickly become bug-prone. I used a `useReducer` pattern to ensure the state machine is predictable and that date ranges are always correctly normalized regardless of drag direction.

## Future Improvements (With More Time)
1. **Real-time API Integration:** 
   - Replacing the static JSON with a REST or GraphQL API to handle live updates and multi-user synchronization.
2. **Persistence Layer:** 
   - Implementing URL-based state or LocalStorage to persist the user's current view (month, filters) across page refreshes.
3. **Advanced Filtering:** 
   - Adding filters for Room Types or Guest Sources to provide deeper insights into property performance.
