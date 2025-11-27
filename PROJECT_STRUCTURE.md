# Project Structure

## Folder Organization
- `src/components/` - Reusable UI components
  - `common/` - Shared components like Header, Button, Input
  - `forms/` - Form-related components
- `src/screens/` - Screen components
  - `ContactList/` - Contact list screen and related components
  - `ContactDetails/` - Contact details screen
  - `AddContact/` - Add/Edit contact forms
- `src/services/` - API and configuration services
- `src/utils/` - Utility functions and context providers
- `src/data/` - Data models and sample data
- `src/constants/` - App constants (colors, strings)
- `src/hooks/` - Custom React hooks
- `src/context/` - React Context providers
- `src/styles/` - Global styles and themes
- `src/assets/` - Static assets
  - `images/` - Image files
  - `fonts/` - Font files

## Development Scripts
- `npm run android` - Start development for Android
- `npm run ios` - Start development for iOS
- `npm run start` - Start Metro bundler
- `npm run lint` - Check code quality with ESLint
- `npm run lint:fix` - Automatically fix linting issues
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean project dependencies and cache

## Environment Configuration
- Development: Uses React Native development environment
- Production: Built release versions
- Data Storage: AsyncStorage for local data persistence

## Import Conventions
Use index files for clean imports:
```javascript
// Instead of:
import CustomInput from '../components/common/CustomInput';
import ContactListItem from '../components/common/ContactListItem';

// Use:
import { CustomInput, ContactListItem } from '../components';