# Chakra UI to Shadcn/UI Migration Script

## Overview
This script assists in migrating Chakra UI components to Shadcn/UI and Tailwind CSS. It provides an initial automated transformation of component imports, names, and basic styling.

## Disclaimer
🚨 **IMPORTANT**: This is an automated migration tool. It CANNOT handle all migration complexities and requires MANUAL REVIEW.

## Usage
```bash
npm run migrate-chakra
```

## Migration Limitations
- Does not handle complex component logic
- May not preserve all styling nuances
- Requires manual verification of each file
- Might introduce syntax errors

## Post-Migration Checklist

### Component Replacement
- [ ] Verify all component imports
- [ ] Check prop compatibility
- [ ] Adjust styling to match Tailwind/Shadcn design
- [ ] Ensure event handlers work correctly

### Styling Considerations
- Replace Chakra UI style props with Tailwind classes
- Use `cn()` for conditional class merging
- Leverage Shadcn/UI component variants

### Common Migration Patterns
1. `<Button colorScheme="blue">` → `<Button variant="primary">`
2. `<VStack>` → `<div className="flex flex-col space-y-4">`
3. `<Flex>` → `<div className="flex">`

## Recommended Workflow
1. Run migration script
2. Git stash current changes
3. Manually review each modified file
4. Make necessary adjustments
5. Run tests
6. Commit changes

## Need Help?
Consult the project migration plan or reach out to the team lead for complex migrations.