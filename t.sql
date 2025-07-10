SELECT * FROM datasetus_household_income.synthetic_health_lifestyle_dataset;

## 1. What are the main demographic characteristics  of the population ?

## below are step by step process to breal down of this insights


 

## total population size 

SELECT COUNT(*) AS total_population
FROM datasetus_household_income.synthetic_health_lifestyle_dataset;

## Age Distribution (Min, Max, Average, Median, Groups)

SELECT 
    MIN(Age) AS min_age,
    MAX(Age) AS max_age,
    AVG(Age) AS avg_age
FROM datasetus_household_income.synthetic_health_lifestyle_dataset;


##   people in each age group

SELECT 
    FLOOR(Age/10)*10 AS age_group,
    COUNT(*) AS count
FROM datasetus_household_income.synthetic_health_lifestyle_dataset
GROUP BY age_group
ORDER BY age_group;


##  Gender Distribution

SELECT 
    Gender, 
    COUNT(*) AS count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM datasetus_household_income.synthetic_health_lifestyle_dataset), 2) AS percent
FROM datasetus_household_income.synthetic_health_lifestyle_dataset
GROUP BY Gender;

## 2  •	How are BMI, sleep hours, and stress levels distributed
## below are the process to answer this question


## a. BMI Distribution

SELECT 
    MIN(BMI) AS min_bmi,
    MAX(BMI) AS max_bmi,
    AVG(BMI) AS avg_bmi,
    STDDEV(BMI) AS stddev_bmi
FROM datasetus_household_income.synthetic_health_lifestyle_dataset;

## b.  Count by BMI Category (Underweight, Normal, Overweight, Obese)

SELECT 
    CASE
        WHEN BMI < 18.5 THEN 'Underweight'
        WHEN BMI < 25 THEN 'Normal'
        WHEN BMI < 30 THEN 'Overweight'
        ELSE 'Obese'
    END AS bmi_category,
    COUNT(*) AS count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM datasetus_household_income.synthetic_health_lifestyle_dataset), 2) AS percent
FROM datasetus_household_income.synthetic_health_lifestyle_dataset
GROUP BY bmi_category;


## c. sleep housrs distribution 

SELECT 
    MIN(Sleep_Hours) AS min_sleep,
    MAX(Sleep_Hours) AS max_sleep,
    AVG(Sleep_Hours) AS avg_sleep,
    STDDEV(Sleep_Hours) AS stddev_sleep
FROM datasetus_household_income.synthetic_health_lifestyle_dataset;

    
    
## d.  Stress Levels Distribution


SELECT 
    MIN(Stress_Level) AS min_stress,
    MAX(Stress_Level) AS max_stress,
    
	AVG(Stress_Level) AS avg_stress,
    STDDEV(Stress_Level) AS stddev_stress
    FROM datasetus_household_income.synthetic_health_lifestyle_dataset;
    
    
## e. Count by Stress Level 

SELECT 
    Stress_Level,
    COUNT(*) AS count
FROM datasetus_household_income.synthetic_health_lifestyle_dataset
GROUP BY Stress_Level
ORDER BY Stress_Level;


## •	3. What percentage of individuals are smokers, exercise regularly, or have chronic diseases?

## breakdown of this question

## a.Percentage of Smokers

SELECT 
  Smoker,
  COUNT(*) AS count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM datasetus_household_income.synthetic_health_lifestyle_dataset), 2) AS percent
FROM datasetus_household_income.synthetic_health_lifestyle_dataset
GROUP BY Smoker;

## b. Percentage Who Exercise Regularly

SELECT 
  Exercise_Freq,
  COUNT(*) AS count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM datasetus_household_income.synthetic_health_lifestyle_dataset), 2) AS percent
FROM datasetus_household_income.synthetic_health_lifestyle_dataset
GROUP BY Exercise_Freq
ORDER BY percent DESC;


## How does the average BMI differ between smokers and non-smokers

SELECT 
    Smoker,
    COUNT(*) AS count,
    ROUND(AVG(BMI), 2) AS avg_bmi
FROM datasetus_household_income.synthetic_health_lifestyle_dataset
GROUP BY Smoker;






## 

SELECT
    Gender,
    COUNT(*) AS count,
    ROUND(AVG(Stress_Level), 2) AS avg_stress
FROM datasetus_household_income.synthetic_health_lifestyle_dataset
GROUP BY Gender;



## 

SELECT
    CONCAT(FLOOR(Age/10)*10, '-', FLOOR(Age/10)*10 + 9) AS age_group,
    COUNT(*) AS count,
    ROUND(AVG(Sleep_Hours), 2) AS avg_sleep_hours
FROM datasetus_household_income.synthetic_health_lifestyle_dataset
GROUP BY CONCAT(FLOOR(Age/10)*10, '-', FLOOR(Age/10)*10 + 9)
ORDER BY MIN(Age);






## Is there a correlation between exercise frequency and BMI or stress level?

SELECT
    Exercise_Freq,
    COUNT(*) AS count,
    ROUND(AVG(BMI), 2) AS avg_bmi,
    ROUND(AVG(Stress_Level), 2) AS avg_stress
FROM datasetus_household_income.synthetic_health_lifestyle_dataset
GROUP BY Exercise_Freq
ORDER BY count DESC;



##  Does higher alcohol consumption relate to increased chronic disease risk?

SELECT
    Alcohol_Consumption,
    COUNT(*) AS total,
    SUM(CASE WHEN Chronic_Disease = 'Yes' THEN 1 ELSE 0 END) AS chronic_count,
    ROUND(SUM(CASE WHEN Chronic_Disease = 'Yes' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS chronic_percent
FROM datasetus_household_income.synthetic_health_lifestyle_dataset
GROUP BY Alcohol_Consumption
ORDER BY chronic_percent DESC;

    
    
##  Are sleep hours negatively correlated with stress level?

 SELECT
    Stress_Level,
    COUNT(*) AS count,
    ROUND(AVG(Sleep_Hours), 2) AS avg_sleep_hours
FROM datasetus_household_income.synthetic_health_lifestyle_dataset
GROUP BY Stress_Level
ORDER BY Stress_Level;








