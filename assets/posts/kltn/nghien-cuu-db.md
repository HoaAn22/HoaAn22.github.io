To organize a database for securities with different maturity timeframes (days, months, years), you’ll want a structure that accommodates various maturities in a flexible and consistent manner. Here’s a recommended approach:

### Table Structure

1. **Securities Table**: A table to store each security's essential information.
   - `security_id` (Primary Key): Unique identifier for each security.
   - `security_name`: Name or description of the security.
   - `issue_date`: The date when the security was issued.
   - `maturity_date`: The date when the security matures.

2. **Maturity Details Table** (optional, if needed for more detailed information):
   - `maturity_id` (Primary Key): Unique identifier for the maturity record.
   - `security_id` (Foreign Key): Link to the `securities` table.
   - `maturity_type`: Enum or string field to indicate the type (e.g., "Days," "Months," "Years").
   - `maturity_period`: Integer value representing the maturity duration.
   - `maturity_date`: Calculated or stored as a secondary reference.

### Suggested Columns for the Securities Table

- `security_id`: Unique ID for each security.
- `security_name`: Descriptive name of the security.
- `issue_date`: Date the security was issued.
- `maturity_period`: Stores the numeric value for maturity (e.g., 90 for 90 days, 2 for 2 years).
- `maturity_type`: Defines whether the maturity period is in days, months, or years.
- `maturity_date`: Stores the calculated date when the security matures.

### Example Data Entry

| security_id | security_name | issue_date | maturity_period | maturity_type | maturity_date |
|-------------|---------------|------------|-----------------|---------------|---------------|
| 1           | Security A    | 2024-01-01 | 90              | Days          | 2024-04-01    |
| 2           | Security B    | 2024-01-01 | 6               | Months        | 2024-07-01    |
| 3           | Security C    | 2024-01-01 | 2               | Years         | 2026-01-01    |

### How to Use This Setup

1. **Data Calculation**: For `maturity_date`, calculate based on `maturity_type`:
   - **Days**: Add the `maturity_period` in days to `issue_date`.
   - **Months**: Add the `maturity_period` in months to `issue_date`.
   - **Years**: Add the `maturity_period` in years to `issue_date`.

2. **Queries**: You can easily filter securities by their maturity type or time remaining until maturity:
   - Example: To get all securities maturing within the next 30 days, calculate based on `maturity_date`.

This structure offers flexibility for different maturity timeframes and keeps the maturity information in one table, simplifying data management and retrieval.

---
The **day count convention** is a system used in finance to determine the number of days between two dates. It’s essential in calculating accrued interest, bond yields, and other time-based financial metrics. Different conventions exist to suit various financial products and regions.

Here are the main types:

### 1. **30/360 or 30/360 US**
   - **Description**: Assumes each month has 30 days, and each year has 360 days.
   - **Usage**: Commonly used for corporate bonds in the US and certain mortgage-backed securities.
   - **Calculation**:
     - Count each month as 30 days.
     - Count each year as 360 days.
   - **Formula**: 
     $$\[
     \text{Days} = 360 \times (\text{Year}_2 - \text{Year}_1) + 30 \times (\text{Month}_2 - \text{Month}_1) + (\text{Day}_2 - \text{Day}_1)
     \]$$

### 2. **Actual/360**
   - **Description**: Counts the actual days between two dates, but assumes a 360-day year.
   - **Usage**: Often used in money market instruments, like Treasury bills, commercial paper, and certain interest rate swaps.
   - **Formula**: 
     $$\[
     \text{Days} = \frac{\text{Actual Days}}{360}
     \]$$

### 3. **Actual/365**
   - **Description**: Counts the actual days between two dates, but assumes a 365-day year.
   - **Usage**: Typically used in the UK and in calculations involving government bonds.
   - **Formula**: 
     $$\[
     \text{Days} = \frac{\text{Actual Days}}{365}
     \]$$

### 4. **Actual/Actual (ISDA)**
   - **Description**: Counts the actual days in each period and uses the actual number of days in each year (365 or 366 for leap years).
   - **Usage**: Used in many bond markets and most common for government bonds.
   - **Formula**: 
     $$\[
     \text{Fraction of Year} = \frac{\text{Actual Days in Period}}{\text{Actual Days in Year}}
     \]$$

### 5. **30/360 European**
   - **Description**: Similar to 30/360 US but with slight adjustments.
   - **Usage**: Primarily used for bonds in European markets.
   - **Rules**:
     - Count each month as 30 days.
     - If the second date's day is 31, adjust it to 30.
   - **Formula**: Same as 30/360 US but with end-of-month adjustments.

### 6. **Actual/365 (Fixed)**
   - **Description**: Counts actual days between two dates and assumes a 365-day year, even for leap years.
   - **Usage**: Used in some derivatives and short-term loan markets.
   - **Formula**: 
     $$\[
     \text{Days} = \frac{\text{Actual Days}}{365}
     \]$$

### Choosing a Day Count Convention

The choice of day count convention depends on the financial instrument, regional practices, and regulatory requirements. It’s crucial to match the convention with the contract or bond’s stipulations to ensure accurate calculations.