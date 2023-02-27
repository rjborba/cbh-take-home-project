# Feature: Custom Id for Agents

Allow Facilities to save custom ID for the Agents they worked with

## 1) Create agents_facilities table

In order to allow Facilities to add their custom ID, it is required to generate an agents_facilities table.

Assuming that Facility shouldn't have more than one custom_id for each agent it worked with, agent_id and facility_id MUST be a composed primary (and unique) key.

### Acceptance Criteria

- Table agents_facilities contains the following columns:

  1. agent_id (Foreign key to Agent table, Primary Key)
  2. facility_id (Foreign key to Facility table, Primary Key)
  3. custom_id (varchar)

- Database Migration Schema is provided, assuming that our stack uses a reletional database like MySQL, Postgrees, etc.

### Timebox estimation

2 hours

## 2) Add CRUD for agents_facilities (API)

Assuming that Facilities should be able to manipulate custom ids freely, it must be able to create, remove, update and delete their custom ids. API should support those opperations, allowing agents_facilities table to be updated.

Assuming that only users authorized by the Facility should be able to READ/WRITE data owned by a Facility, these endpoints should have restricted access and return the response code 401 for unauthorized access.

### Acceptance Criteria

- Given a Facility authorized user, it is possible to:
  - Create
  - Remove
  - Update
  - Delete
- Given an unauthorized user, when creating, removing, updating and deleting custom ids then 401 response code should be returned
- Assuming that Automated Tests are part of the company's developer flow, at least smoke tests should be implemented.

### Timebox estimation

4 hours

## 3) Make getShiftsByFacility optionally use custom ids

getShiftsByFacility should allow optionally request custom ids to be used.

In case of useCustomId property is true:
database query should also do a join with agents_facilities after the join with the Agent table.

In case of custom id is not set, internal ID should be used, assuming that it is the desired behavior. So, inner join is not desirable for this join.

### Acceptance Criteria

- getShiftsByFacility should have signature:
  getShiftsByFacility(facilityId: string, options?: { useCustomId?: boolean })
- If no custom id is set, use internal ID.
- Given useSutomId, when false or undefined, no join with agents_facilities tables is made and only internal ids are returned.
- Assuming that Automated Tests are part of the company's developer flow, unity test is required.

### Timebox estimation

8 hours

## 4) Update platform interface with inputs for custom IDs (Interface)

Assuming that UI/UX document is available,

Facility authorized users should be able to easily create, remove, update and delete custom ids for Agent that worked on the facility Curent interent must be updated in order to allow it.

### Acceptance Criteria

- Given a Facility authorized user, it is possible to, using the interface:
  - Create
  - Remove
  - Update
  - Delete
- Given an unauthorized user, when creating, removing, updating and deleting custom ids then user should be informed that their credentials are not enough to execute operation.
- Assuming that Automated Tests are part of the company's developer flow, at least smoke tests should be implemented for each new component.

### Timebox estimation

8 hours
