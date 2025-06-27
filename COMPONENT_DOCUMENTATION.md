# MStack Component Documentation

## Overview
This document provides comprehensive documentation for all React components in the MStack User Management System, including PropTypes, usage examples, and implementation details.

## Table of Contents
- [App Components](#app-components)
- [Layout Components](#layout-components)
- [Feature Components](#feature-components)
- [Form Components](#form-components)
- [UI Components](#ui-components)

## App Components

### App.jsx
Main application component that sets up routing and global state.

**Props:** None

**Usage:**
```jsx
import App from './App';

// In main.jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Features:**
- Redux store provider
- Router setup
- Global CSS imports
- Authentication state management

### AppRouter.jsx
Handles application routing and protected routes.

**Props:** None

**Usage:**
```jsx
import AppRouter from './app/AppRouter';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}
```

**Routes:**
- `/login` - Login page
- `/dashboard` - Main dashboard (protected)
- `/tenants` - Tenant management (protected)
- `/organizations` - Organization management (protected)
- `/users` - User management (protected)
- `/roles` - Role management (protected)
- `/privileges` - Privilege management (protected)
- `/legal-entities` - Legal entity management (protected)

### ProtectedRoute.jsx
Wrapper component that protects routes requiring authentication.

**Props:**
```jsx
{
  children: React.ReactNode,  // Components to render if authenticated
  redirectTo?: string         // Redirect path if not authenticated (default: '/login')
}
```

**Usage:**
```jsx
import ProtectedRoute from './app/ProtectedRoute';

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  } 
/>
```

## Layout Components

### Navbar.jsx
Top navigation bar with user menu and notifications.

**Props:** None

**Usage:**
```jsx
import Navbar from './components/Navbar';

function Layout() {
  return (
    <div>
      <Navbar />
      {/* Other content */}
    </div>
  );
}
```

**Features:**
- Responsive design with mobile menu toggle
- User profile dropdown
- Notification bell
- Brand logo and name
- Logout functionality

**State Management:**
- Uses Redux for user authentication state
- Local state for dropdown visibility
- Responsive breakpoint detection

### Sidebar.jsx
Left sidebar navigation with menu items.

**Props:** None

**Usage:**
```jsx
import Sidebar from './components/Sidebar';

function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        {/* Main content */}
      </main>
    </div>
  );
}
```

**Menu Items:**
- Dashboard
- Tenants
- Organizations
- Users
- Roles
- Privileges
- Legal Entities

**Features:**
- Collapsible on mobile
- Active route highlighting
- Icon-based navigation
- Smooth animations

### Footer.jsx
Application footer with links and information.

**Props:** None

**Usage:**
```jsx
import Footer from './components/Footer';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Main content */}
      </main>
      <Footer />
    </div>
  );
}
```

**Content:**
- Copyright information
- Version number
- Quick links
- Social media links

## Feature Components

### DashboardPage.jsx
Main dashboard with overview cards and statistics.

**Props:** None

**Usage:**
```jsx
import DashboardPage from './features/dashboard/DashboardPage';

<Route path="/dashboard" element={<DashboardPage />} />
```

**Components:**
- Statistics cards
- Recent activity feed
- Quick action buttons
- Charts and graphs

**Data Sources:**
- Redux store for user data
- API calls for statistics
- Real-time updates

### TenantsPage.jsx
Tenant management page with CRUD operations.

**Props:** None

**Usage:**
```jsx
import TenantsPage from './features/tenants/TenantsPage';

<Route path="/tenants" element={<TenantsPage />} />
```

**Features:**
- Tenant listing with search
- Create new tenant modal
- Edit tenant functionality
- Delete confirmation
- Bulk operations

**State Management:**
- Redux for tenant data
- Local state for modals and forms
- Form validation with react-hook-form

### UsersPage.jsx
User management page with advanced filtering.

**Props:** None

**Usage:**
```jsx
import UsersPage from './features/users/UsersPage';

<Route path="/users" element={<UsersPage />} />
```

**Features:**
- User grid/list view
- Advanced search and filters
- Role assignment
- Organization assignment
- Bulk user operations

### OrganizationsPage.jsx
Organization management within tenants.

**Props:** None

**Usage:**
```jsx
import OrganizationsPage from './features/organizations/OrganizationsPage';

<Route path="/organizations" element={<OrganizationsPage />} />
```

**Features:**
- Organization hierarchy
- Tenant-specific organizations
- Contact information management
- Industry classification

### RolesPage.jsx
Role-based access control management.

**Props:** None

**Usage:**
```jsx
import RolesPage from './features/roles/RolesPage';

<Route path="/roles" element={<RolesPage />} />
```

**Features:**
- Role creation and editing
- Privilege assignment
- System vs custom roles
- Role inheritance

### PrivilegesPage.jsx
Granular permission management.

**Props:** None

**Usage:**
```jsx
import PrivilegesPage from './features/privileges/PrivilegesPage';

<Route path="/privileges" element={<PrivilegesPage />} />
```

**Features:**
- Privilege creation
- Resource-based permissions
- Permission matrix view
- Bulk privilege operations

### LegalEntitiesPage.jsx
Legal entity management for compliance.

**Props:** None

**Usage:**
```jsx
import LegalEntitiesPage from './features/legalEntities/LegalEntitiesPage';

<Route path="/legal-entities" element={<LegalEntitiesPage />} />
```

**Features:**
- Legal entity registration
- Tax information management
- Jurisdiction handling
- Currency configuration

### LoginPage.jsx
Authentication page with form validation.

**Props:** None

**Usage:**
```jsx
import LoginPage from './features/auth/LoginPage';

<Route path="/login" element={<LoginPage />} />
```

**Features:**
- Email/password authentication
- Form validation
- Error handling
- Remember me functionality
- Forgot password link

## Form Components

### Modal.jsx
Reusable modal component for forms and dialogs.

**Props:**
```jsx
{
  isOpen: boolean,                    // Modal visibility
  onClose: () => void,               // Close handler
  title: string,                     // Modal title
  children: React.ReactNode,         // Modal content
  size?: 'sm' | 'md' | 'lg' | 'xl', // Modal size
  showCloseButton?: boolean          // Show close button (default: true)
}
```

**Usage:**
```jsx
import Modal from './components/Modal';

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Create New User"
      size="lg"
    >
      <UserForm onSubmit={handleSubmit} />
    </Modal>
  );
}
```

**Features:**
- Backdrop click to close
- ESC key to close
- Focus trap
- Smooth animations
- Responsive sizing

## UI Components

### Button Components
Various button styles and variants.

**Primary Button:**
```jsx
<button className="btn-primary">
  Primary Action
</button>
```

**Secondary Button:**
```jsx
<button className="btn-secondary">
  Secondary Action
</button>
```

**Danger Button:**
```jsx
<button className="btn-danger">
  Delete
</button>
```

**Button Sizes:**
- `btn-sm` - Small
- `btn-md` - Medium (default)
- `btn-lg` - Large

### Form Components
Reusable form elements with consistent styling.

**Input Field:**
```jsx
<div className="form-group">
  <label htmlFor="email" className="form-label">Email</label>
  <input
    type="email"
    id="email"
    className="form-input"
    placeholder="Enter email"
  />
</div>
```

**Select Field:**
```jsx
<div className="form-group">
  <label htmlFor="role" className="form-label">Role</label>
  <select id="role" className="form-select">
    <option value="">Select role</option>
    <option value="admin">Admin</option>
    <option value="user">User</option>
  </select>
</div>
```

**Textarea:**
```jsx
<div className="form-group">
  <label htmlFor="description" className="form-label">Description</label>
  <textarea
    id="description"
    className="form-textarea"
    rows="4"
    placeholder="Enter description"
  />
</div>
```

### Card Components
Content containers with consistent styling.

**Basic Card:**
```jsx
<div className="card">
  <div className="card-header">
    <h3 className="card-title">Card Title</h3>
  </div>
  <div className="card-body">
    Card content goes here
  </div>
</div>
```

**Card with Actions:**
```jsx
<div className="card">
  <div className="card-header">
    <h3 className="card-title">User List</h3>
    <div className="card-actions">
      <button className="btn-primary btn-sm">Add User</button>
    </div>
  </div>
  <div className="card-body">
    {/* User list content */}
  </div>
</div>
```

### Table Components
Data display with sorting and pagination.

**Basic Table:**
```jsx
<div className="table-container">
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <button className="btn-secondary btn-sm">Edit</button>
            <button className="btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

## Styling Guidelines

### CSS Classes
The application uses Tailwind CSS with custom utility classes:

**Layout:**
- `container` - Main container
- `flex` - Flexbox layout
- `grid` - CSS Grid layout
- `hidden` / `block` - Display utilities

**Spacing:**
- `p-{size}` - Padding
- `m-{size}` - Margin
- `gap-{size}` - Gap between flex/grid items

**Colors:**
- `text-{color}` - Text colors
- `bg-{color}` - Background colors
- `border-{color}` - Border colors

**Responsive:**
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large screens (1280px+)

### Custom Components
Custom CSS classes for consistent styling:

**Buttons:**
```css
.btn-primary { /* Primary button styles */ }
.btn-secondary { /* Secondary button styles */ }
.btn-danger { /* Danger button styles */ }
```

**Forms:**
```css
.form-group { /* Form group container */ }
.form-label { /* Form label styles */ }
.form-input { /* Input field styles */ }
.form-select { /* Select field styles */ }
```

**Cards:**
```css
.card { /* Card container */ }
.card-header { /* Card header */ }
.card-body { /* Card content */ }
.card-title { /* Card title */ }
```

## Best Practices

### Component Structure
1. **Single Responsibility**: Each component should have one clear purpose
2. **Props Interface**: Define clear PropTypes for all components
3. **Default Props**: Provide sensible defaults where appropriate
4. **Error Boundaries**: Wrap components that might fail
5. **Loading States**: Handle loading and error states gracefully

### Performance
1. **Memoization**: Use React.memo for expensive components
2. **Lazy Loading**: Load components on demand
3. **Code Splitting**: Split code by routes and features
4. **Optimized Rendering**: Avoid unnecessary re-renders

### Accessibility
1. **Semantic HTML**: Use proper HTML elements
2. **ARIA Labels**: Add appropriate ARIA attributes
3. **Keyboard Navigation**: Ensure keyboard accessibility
4. **Screen Reader Support**: Test with screen readers
5. **Color Contrast**: Maintain sufficient color contrast

### Testing
1. **Unit Tests**: Test individual components
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test complete user workflows
4. **Accessibility Tests**: Test accessibility compliance

## Component Lifecycle

### Mounting
1. Constructor (if using class components)
2. Render
3. ComponentDidMount (class) / useEffect (hooks)

### Updating
1. ShouldComponentUpdate (class) / React.memo (hooks)
2. Render
3. ComponentDidUpdate (class) / useEffect (hooks)

### Unmounting
1. ComponentWillUnmount (class) / useEffect cleanup (hooks)

## State Management

### Local State
Use useState for component-specific state:
```jsx
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({});
```

### Global State
Use Redux for application-wide state:
```jsx
const dispatch = useDispatch();
const user = useSelector(state => state.auth.user);
```

### Form State
Use react-hook-form for form management:
```jsx
const { register, handleSubmit, formState: { errors } } = useForm();
```
