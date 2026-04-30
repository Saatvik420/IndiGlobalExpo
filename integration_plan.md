# India Trade Expo - Full Stack Integration Plan

## 1. Backend Architecture Refactor (Comprehensive Strategy)
**Goal:** Transition from controller-heavy logic to a clean, service-oriented architecture for maintainability and testability.

*   **Service Layer Creation:** Introduce `AuthService`, `TicketService`, `ExhibitorService`, and `AdminService`.
*   **Controller Updates:** Refactor existing controllers (`AuthController`, `TicketController`) to delegate to services.
*   **Exhibitor API:** Implement `ExhibitorController` (`POST /api/exhibitors/apply`, `GET /api/exhibitors/status`).
*   **Admin API:** Implement `AdminController` (`GET /api/admin/users`, `GET /api/admin/tickets`, `GET /api/admin/exhibitors`, `PUT /api/admin/exhibitors/{id}/status`).
*   **Security:** Enforce `@PreAuthorize("hasRole('ADMIN')")` on the Admin API. We will also initialize a default admin user in `IndTradeExpoApplication.java`.

## 2. Backend Testing
**Goal:** Ensure reliability of the new business logic.

*   Write comprehensive unit tests using **JUnit 5** and **Mockito** for the newly created services (`TicketService`, `ExhibitorService`, `AdminService`).

## 3. Frontend Integration
**Goal:** Connect the React application to the fully functional backend and provide an administrative interface.

*   **API Services:** Expand `src/services/` to include `exhibitorService.js` and `adminService.js`.
*   **Tickets Page (`Tickets.jsx`):** Replace mock `setTimeout` functions with actual API calls to process ticket purchases and store them in MongoDB.
*   **Exhibitor Page (`Exhibitor.jsx`):** Implement a modal or form to capture exhibitor application details (Company, Sector, Website) and submit them via the API.
*   **Admin Dashboard (`src/pages/admin/AdminDashboard.jsx`):**
    *   Create a new protected route (`/admin`).
    *   Build a dashboard with tabs to view registered users, purchased tickets, and pending exhibitor applications.
    *   Add functionality to **Approve** or **Reject** exhibitor applications.
*   **Routing (`App.jsx`):** Update application routes to include the new Admin Dashboard and ensure proper role-based redirection.

This plan ensures a robust, scalable, and fully integrated application ready for production use.