        document.addEventListener('DOMContentLoaded', function() {
            const nameForm = document.getElementById('nameForm');
            const loadingSpinner = document.getElementById('loadingSpinner');
            const resultContainer = document.getElementById('resultContainer');
            const nameDisplay = document.getElementById('nameDisplay');
            const totalPeople = document.getElementById('totalPeople');
            const nameRank = document.getElementById('nameRank');
            const nameSummary = document.getElementById('nameSummary');
            const searchAgainBtn = document.getElementById('searchAgainBtn');
            
            // Gender elements
            const malePercentage = document.getElementById('malePercentage');
            const femalePercentage = document.getElementById('femalePercentage');
            const maleCount = document.getElementById('maleCount');
            const femaleCount = document.getElementById('femaleCount');
            
            // Age elements
            const averageAge = document.getElementById('averageAge');
            const youngPercentage = document.getElementById('youngPercentage');
            const adultPercentage = document.getElementById('adultPercentage');
            const oldPercentage = document.getElementById('oldPercentage');
            const youngPercentageBar = document.getElementById('youngPercentageBar');
            const adultPercentageBar = document.getElementById('adultPercentageBar');
            const oldPercentageBar = document.getElementById('oldPercentageBar');
            
            // Additional info elements
            const firstLetter = document.getElementById('firstLetter');
            const firstLetterBar = document.getElementById('firstLetterBar');
            const firstLetterText = document.getElementById('firstLetterText');
            const nameLength = document.getElementById('nameLength');
            const nameLengthBar = document.getElementById('nameLengthBar');
            const nameLengthText = document.getElementById('nameLengthText');
            const nameOrigin = document.getElementById('nameOrigin');
            const historicalInsights = document.getElementById('historicalInsights');
            
            // Charts
            let yearTrendChart = null;
            let usMapChart = null;
            
            // Name database (simplified for demo purposes)
            const nameDatabase = {
                'john': { 
                    count: 3271000, 
                    rank: 2,
                    gender: { male: 99.1, female: 0.9 },
                    age: { average: 51, young: 15, adult: 55, old: 30 },
                    letterFrequency: 8.2,
                    lengthFrequency: 12.5,
                    origin: "John is a name of Hebrew origin meaning 'God is gracious'. It has been one of the most consistently popular names in English-speaking countries for centuries.",
                    historical: "John was extremely popular in the mid-20th century, peaking in the 1950s. Its popularity has gradually declined since then, though it remains a classic name.",
                    yearData: [5.2, 4.9, 4.7, 4.5, 4.2, 3.9, 3.7, 3.5, 3.2, 3.0, 2.8, 2.6, 2.4, 2.2, 2.0, 1.8, 1.6, 1.4, 1.2, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5]
                },
                'mary': { 
                    count: 2629000, 
                    rank: 6,
                    gender: { male: 0.2, female: 99.8 },
                    age: { average: 63, young: 5, adult: 45, old: 50 },
                    letterFrequency: 6.5,
                    lengthFrequency: 10.2,
                    origin: "Mary is a name of Hebrew origin meaning 'bitter' or 'beloved'. It has been one of the most enduringly popular feminine names in Western culture, largely due to its biblical significance.",
                    historical: "Mary was the most popular female name in the United States for decades, especially from the 1880s through the 1950s. Its popularity has significantly declined since the 1960s.",
                    yearData: [7.1, 6.8, 6.5, 6.2, 5.8, 5.4, 5.0, 4.6, 4.2, 3.8, 3.4, 3.0, 2.6, 2.2, 1.8, 1.5, 1.2, 1.0, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.3]
                },
                'michael': { 
                    count: 1568000, 
                    rank: 1,
                    gender: { male: 99.5, female: 0.5 },
                    age: { average: 42, young: 25, adult: 65, old: 10 },
                    letterFrequency: 3.1,
                    lengthFrequency: 7.8,
                    origin: "Michael is a name of Hebrew origin meaning 'who is like God?'. It has been a consistently popular name across many cultures and religions.",
                    historical: "Michael was the most popular male name in the United States from the 1950s through the 1990s, holding the #1 spot for many years. Its popularity has slightly declined in recent decades but remains strong.",
                    yearData: [2.1, 2.4, 2.8, 3.2, 3.6, 4.0, 4.4, 4.8, 5.2, 5.6, 5.8, 5.6, 5.2, 4.8, 4.4, 4.0, 3.6, 3.2, 2.8, 2.4, 2.0, 1.8, 1.6, 1.4, 1.2]
                },
                'jennifer': { 
                    count: 932000, 
                    rank: 7,
                    gender: { male: 0.1, female: 99.9 },
                    age: { average: 45, young: 15, adult: 80, old: 5 },
                    letterFrequency: 0.9,
                    lengthFrequency: 5.2,
                    origin: "Jennifer is a name of Welsh origin meaning 'white wave' or 'fair one'. It became extremely popular in the English-speaking world in the 20th century.",
                    historical: "Jennifer saw an extraordinary surge in popularity in the 1970s and early 1980s, when it was the #1 female name in the United States. Its popularity has significantly declined since then.",
                    yearData: [0.2, 0.3, 0.4, 0.6, 0.9, 1.4, 2.0, 2.8, 3.8, 4.8, 5.6, 5.2, 4.6, 3.8, 3.0, 2.4, 1.8, 1.4, 1.0, 0.8, 0.6, 0.5, 0.4, 0.3, 0.2]
                },
                'robert': { 
                    count: 1143000, 
                    rank: 3,
                    gender: { male: 99.7, female: 0.3 },
                    age: { average: 58, young: 10, adult: 50, old: 40 },
                    letterFrequency: 7.2,
                    lengthFrequency: 9.5,
                    origin: "Robert is a name of Germanic origin meaning 'bright fame'. It has been a popular name in many European countries for centuries.",
                    historical: "Robert was among the most popular male names in the United States throughout the first half of the 20th century. Its popularity has gradually declined since the 1950s but remains a classic choice.",
                    yearData: [4.8, 4.6, 4.4, 4.2, 4.0, 3.8, 3.6, 3.4, 3.2, 3.0, 2.8, 2.6, 2.4, 2.2, 2.0, 1.8, 1.6, 1.4, 1.2, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5]
                },
                'david': { 
                    count: 1347000, 
                    rank: 5,
                    gender: { male: 99.4, female: 0.6 },
                    age: { average: 49, young: 18, adult: 62, old: 20 },
                    letterFrequency: 4.1,
                    lengthFrequency: 8.7,
                    origin: "David is a name of Hebrew origin meaning 'beloved'. It has been popular across many cultures due to its biblical significance.",
                    historical: "David has been consistently popular throughout the 20th century, particularly from the 1950s through the 1980s. It has maintained steady popularity without extreme peaks or valleys.",
                    yearData: [3.2, 3.4, 3.6, 3.8, 4.0, 4.2, 4.4, 4.6, 4.8, 4.6, 4.4, 4.2, 4.0, 3.8, 3.6, 3.4, 3.2, 3.0, 2.8, 2.6, 2.4, 2.2, 2.0, 1.8, 1.6]
                }
            };
            
            // US population estimate for calculation
            const usPopulation = 331900000; // 331.9 million as of 2021
            
            // State data for map visualization
            const stateData = {
                'AL': { fullName: 'Alabama', percentage: 0 },
                'AK': { fullName: 'Alaska', percentage: 0 },
                'AZ': { fullName: 'Arizona', percentage: 0 },
                'AR': { fullName: 'Arkansas', percentage: 0 },
                'CA': { fullName: 'California', percentage: 0 },
                'CO': { fullName: 'Colorado', percentage: 0 },
                'CT': { fullName: 'Connecticut', percentage: 0 },
                'DE': { fullName: 'Delaware', percentage: 0 },
                'FL': { fullName: 'Florida', percentage: 0 },
                'GA': { fullName: 'Georgia', percentage: 0 },
                'HI': { fullName: 'Hawaii', percentage: 0 },
                'ID': { fullName: 'Idaho', percentage: 0 },
                'IL': { fullName: 'Illinois', percentage: 0 },
                'IN': { fullName: 'Indiana', percentage: 0 },
                'IA': { fullName: 'Iowa', percentage: 0 },
                'KS': { fullName: 'Kansas', percentage: 0 },
                'KY': { fullName: 'Kentucky', percentage: 0 },
                'LA': { fullName: 'Louisiana', percentage: 0 },
                'ME': { fullName: 'Maine', percentage: 0 },
                'MD': { fullName: 'Maryland', percentage: 0 },
                'MA': { fullName: 'Massachusetts', percentage: 0 },
                'MI': { fullName: 'Michigan', percentage: 0 },
                'MN': { fullName: 'Minnesota', percentage: 0 },
                'MS': { fullName: 'Mississippi', percentage: 0 },
                'MO': { fullName: 'Missouri', percentage: 0 },
                'MT': { fullName: 'Montana', percentage: 0 },
                'NE': { fullName: 'Nebraska', percentage: 0 },
                'NV': { fullName: 'Nevada', percentage: 0 },
                'NH': { fullName: 'New Hampshire', percentage: 0 },
                'NJ': { fullName: 'New Jersey', percentage: 0 },
                'NM': { fullName: 'New Mexico', percentage: 0 },
                'NY': { fullName: 'New York', percentage: 0 },
                'NC': { fullName: 'North Carolina', percentage: 0 },
                'ND': { fullName: 'North Dakota', percentage: 0 },
                'OH': { fullName: 'Ohio', percentage: 0 },
                'OK': { fullName: 'Oklahoma', percentage: 0 },
                'OR': { fullName: 'Oregon', percentage: 0 },
                'PA': { fullName: 'Pennsylvania', percentage: 0 },
                'RI': { fullName: 'Rhode Island', percentage: 0 },
                'SC': { fullName: 'South Carolina', percentage: 0 },
                'SD': { fullName: 'South Dakota', percentage: 0 },
                'TN': { fullName: 'Tennessee', percentage: 0 },
                'TX': { fullName: 'Texas', percentage: 0 },
                'UT': { fullName: 'Utah', percentage: 0 },
                'VT': { fullName: 'Vermont', percentage: 0 },
                'VA': { fullName: 'Virginia', percentage: 0 },
                'WA': { fullName: 'Washington', percentage: 0 },
                'WV': { fullName: 'West Virginia', percentage: 0 },
                'WI': { fullName: 'Wisconsin', percentage: 0 },
                'WY': { fullName: 'Wyoming', percentage: 0 }
            };

            // Form submission handler
            nameForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Form validation
                if (!nameForm.checkValidity()) {
                    event.stopPropagation();
                    nameForm.classList.add('was-validated');
                    return;
                }
                
                const firstName = document.getElementById('firstName').value.trim();
                const lastName = document.getElementById('lastName').value.trim();
                
                if (firstName === '') {
                    return;
                }
                
                // Show loading spinner
                loadingSpinner.style.display = 'block';
                resultContainer.style.display = 'none';
                
                // Simulate API call with setTimeout
                setTimeout(() => {
                    calculateNameStatistics(firstName, lastName);
                    
                    // Hide loading spinner and show results
                    loadingSpinner.style.display = 'none';
                    resultContainer.style.display = 'block';
                    
                    // Scroll to results
                    resultContainer.scrollIntoView({ behavior: 'smooth' });
                }, 1500);
            });
            
            // Calculate name statistics
            function calculateNameStatistics(firstName, lastName) {
                // Display the name
                if (lastName) {
                    nameDisplay.textContent = `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(lastName)}`;
                } else {
                    nameDisplay.textContent = capitalizeFirstLetter(firstName);
                }
                
                // Get name data from our "database" or generate random data if not found
                const nameData = nameDatabase[firstName.toLowerCase()] || generateRandomNameData(firstName);
                
                // Update overview tab
                totalPeople.textContent = nameData.count.toLocaleString();
                nameRank.textContent = `#${nameData.rank.toLocaleString()}`;
                nameSummary.textContent = generateNameSummary(firstName, lastName, nameData);
                
                // Update demographics tab
                updateGenderDistribution(nameData);
                updateAgeDistribution(nameData);
                
                // Update additional info tab
                updateAdditionalInfo(firstName, nameData);
                
                // Update historical trends tab
                updateHistoricalTrends(firstName, nameData);
                
                // Update geography tab
                updateGeographyData(firstName, nameData);
            }
            
            // Update gender distribution
            function updateGenderDistribution(nameData) {
                const malePercent = nameData.gender.male;
                const femalePercent = nameData.gender.female;
                const totalCount = nameData.count;
                
                malePercentage.textContent = `${malePercent.toFixed(1)}%`;
                femalePercentage.textContent = `${femalePercent.toFixed(1)}%`;
                
                const maleTotal = Math.round(totalCount * malePercent / 100);
                const femaleTotal = Math.round(totalCount * femalePercent / 100);
                
                maleCount.textContent = `${maleTotal.toLocaleString()} people`;
                femaleCount.textContent = `${femaleTotal.toLocaleString()} people`;
            }
            
            // Update age distribution
            function updateAgeDistribution(nameData) {
                const avgAge = nameData.age.average;
                const youngPercent = nameData.age.young;
                const adultPercent = nameData.age.adult;
                const oldPercent = nameData.age.old;
                
                averageAge.textContent = avgAge;
                youngPercentage.textContent = `${youngPercent}%`;
                adultPercentage.textContent = `${adultPercent}%`;
                oldPercentage.textContent = `${oldPercent}%`;
                
                youngPercentageBar.style.width = `${youngPercent}%`;
                adultPercentageBar.style.width = `${adultPercent}%`;
                oldPercentageBar.style.width = `${oldPercent}%`;
            }
            
            // Update additional info
            function updateAdditionalInfo(name, nameData) {
                const firstChar = name.charAt(0).toUpperCase();
                firstLetter.textContent = firstChar;
                
                const letterFreq = nameData.letterFrequency;
                firstLetterBar.style.width = `${letterFreq}%`;
                firstLetterBar.textContent = `${letterFreq}%`;
                firstLetterText.textContent = `${letterFreq}% of people in the U.S. have names starting with "${firstChar}".`;
                
                const nameLen = name.length;
                nameLength.textContent = nameLen;
                
                const lengthFreq = nameData.lengthFrequency;
                nameLengthBar.style.width = `${lengthFreq}%`;
                nameLengthBar.textContent = `${lengthFreq}%`;
                nameLengthText.textContent = `${lengthFreq}% of people have names with ${nameLen} characters.`;
                
                nameOrigin.textContent = nameData.origin;
                historicalInsights.textContent = nameData.historical;
            }
            
            // Update historical trends
            function updateHistoricalTrends(name, nameData) {
                const ctx = document.getElementById('yearTrendChart').getContext('2d');
                
                // Destroy previous chart if it exists
                if (yearTrendChart) {
                    yearTrendChart.destroy();
                }
                
                // Generate years from 1950 to 2025 (in 3-year increments)
                const years = [];
                for (let year = 1950; year <= 2025; year += 3) {
                    years.push(year);
                }
                
                // Create new chart
                yearTrendChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: years,
                        datasets: [{
                            label: `${capitalizeFirstLetter(name)} Popularity (%)`,
                            data: nameData.yearData,
                            backgroundColor: 'rgba(106, 27, 154, 0.2)',
                            borderColor: 'rgba(106, 27, 154, 1)',
                            borderWidth: 2,
                            pointBackgroundColor: 'rgba(106, 27, 154, 1)',
                            pointRadius: 4,
                            tension: 0.3
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Percentage of Population'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Year'
                                }
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return `${context.dataset.label}: ${context.raw}%`;
                                    }
                                }
                            }
                        }
                    }
                });
            }
            
            // Update geography data
            function updateGeographyData(name, nameData) {
                // Generate random state percentages
                const statePercentages = {};
                let topStates = [];
                
                for (const stateCode in stateData) {
                    // Generate a random percentage based on the name's overall popularity
                    // with some variation between states
                    const basePercentage = (nameData.count / usPopulation) * 100;
                    const randomFactor = Math.random() * 2 + 0.5; // Random factor between 0.5 and 2.5
                    const statePercentage = basePercentage * randomFactor;
                    
                    stateData[stateCode].percentage = statePercentage;
                    statePercentages[stateCode] = statePercentage;
                    
                    topStates.push({
                        code: stateCode,
                        name: stateData[stateCode].fullName,
                        percentage: statePercentage
                    });
                }
                
                // Sort states by percentage and get top 5
                topStates.sort((a, b) => b.percentage - a.percentage);
                topStates = topStates.slice(0, 5);
                
                // Update top states container
                const topStatesContainer = document.getElementById('topStatesContainer');
                topStatesContainer.innerHTML = '';
                
                topStates.forEach((state, index) => {
                    const stateCount = Math.round((state.percentage / 100) * getStatePopulation(state.code));
                    
                    const stateHtml = `
                        <div class="card mb-3">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">${index + 1}. ${state.name}</h5>
                                    <span class="badge bg-primary">${state.percentage.toFixed(4)}%</span>
                                </div>
                                <div class="progress mt-2">
                                    <div class="progress-bar" role="progressbar" style="width: ${Math.min(state.percentage * 5, 100)}%"></div>
                                </div>
                                <p class="mt-2 mb-0">Approximately ${stateCount.toLocaleString()} people named ${capitalizeFirstLetter(name)}</p>
                            </div>
                        </div>
                    `;
                    
                    topStatesContainer.innerHTML += stateHtml;
                });
                
                // For a real implementation, you would create a US map visualization here
                // For this demo, we'll just show a placeholder message
                const usMapChart = document.getElementById('usMapChart');
                const ctx = usMapChart.getContext('2d');
                ctx.clearRect(0, 0, usMapChart.width, usMapChart.height);
                ctx.font = '16px Arial';
                ctx.fillStyle = '#6a1b9a';
                ctx.textAlign = 'center';
                ctx.fillText('US Map Visualization would appear here', usMapChart.width / 2, usMapChart.height / 2);
                ctx.font = '14px Arial';
                ctx.fillText('(Showing state-by-state distribution)', usMapChart.width / 2, usMapChart.height / 2 + 30);
            }
            
            // Generate random name data for names not in our database
            function generateRandomNameData(name) {
                const count = Math.floor(Math.random() * 1000000) + 10000;
                const rank = Math.floor(Math.random() * 1000) + 1;
                
                // Determine likely gender based on name ending
                let malePercent, femalePercent;
                if (name.toLowerCase().endsWith('a') || name.toLowerCase().endsWith('e')) {
                    femalePercent = Math.random() * 30 + 70; // 70-100%
                    malePercent = 100 - femalePercent;
                } else {
                    malePercent = Math.random() * 30 + 70; // 70-100%
                    femalePercent = 100 - malePercent;
                }
                
                // Generate random age distribution
                const youngPercent = Math.floor(Math.random() * 40) + 10;
                const oldPercent = Math.floor(Math.random() * 30) + 10;
                const adultPercent = 100 - youngPercent - oldPercent;
                const averageAge = Math.floor(Math.random() * 30) + 30;
                
                // Generate random letter and length frequencies
                const letterFrequency = Math.random() * 10 + 1;
                const lengthFrequency = Math.random() * 15 + 5;
                
                // Generate random historical data
                const yearData = [];
                let currentValue = Math.random() * 3 + 0.5;
                
                for (let i = 0; i < 25; i++) {
                    yearData.push(currentValue);
                    // Random walk for next value
                    const change = (Math.random() - 0.5) * 0.5;
                    currentValue = Math.max(0.1, currentValue + change);
                }
                
                return {
                    count: count,
                    rank: rank,
                    gender: { male: malePercent, female: femalePercent },
                    age: { average: averageAge, young: youngPercent, adult: adultPercent, old: oldPercent },
                    letterFrequency: letterFrequency,
                    lengthFrequency: lengthFrequency,
                    origin: `${capitalizeFirstLetter(name)} is a name with various origins and meanings across different cultures. It has gained popularity in recent years.`,
                    historical: `The name ${capitalizeFirstLetter(name)} has shown interesting trends over the decades, with periods of both increasing and decreasing popularity.`,
                    yearData: yearData
                };
            }
            
            // Generate name summary
            function generateNameSummary(firstName, lastName, nameData) {
                let summary = '';
                
                if (lastName) {
                    summary = `Based on our statistical analysis, there are approximately ${nameData.count.toLocaleString()} people in the United States with the first name ${capitalizeFirstLetter(firstName)}. `;
                    summary += `When combined with the last name ${capitalizeFirstLetter(lastName)}, this number becomes more unique. `;
                } else {
                    summary = `Based on our statistical analysis, there are approximately ${nameData.count.toLocaleString()} people in the United States with the name ${capitalizeFirstLetter(firstName)}. `;
                }
                
                if (nameData.rank <= 10) {
                    summary += `This is an extremely popular name, ranking #${nameData.rank} in the United States. `;
                } else if (nameData.rank <= 100) {
                    summary += `This is a very common name, ranking #${nameData.rank} in the United States. `;
                } else if (nameData.rank <= 500) {
                    summary += `This is a moderately common name, ranking #${nameData.rank} in the United States. `;
                } else {
                    summary += `This is a relatively uncommon name, ranking #${nameData.rank} in the United States. `;
                }
                
                // Add gender information
                if (nameData.gender.male > 90) {
                    summary += `It is predominantly used as a male name (${nameData.gender.male.toFixed(1)}%). `;
                } else if (nameData.gender.female > 90) {
                    summary += `It is predominantly used as a female name (${nameData.gender.female.toFixed(1)}%). `;
                } else {
                    summary += `It is used for both males (${nameData.gender.male.toFixed(1)}%) and females (${nameData.gender.female.toFixed(1)}%). `;
                }
                
                // Add age information
                summary += `People with this name have an average age of ${nameData.age.average} years. `;
                
                return summary;
            }
            
            // Helper function to get estimated state population
            function getStatePopulation(stateCode) {
                // Simplified state population data (in millions)
                const statePopulations = {
                    'CA': 39.5, 'TX': 29.0, 'FL': 21.5, 'NY': 19.5, 'PA': 12.8,
                    'IL': 12.7, 'OH': 11.7, 'GA': 10.6, 'NC': 10.4, 'MI': 10.0,
                    'NJ': 9.3, 'VA': 8.5, 'WA': 7.6, 'AZ': 7.2, 'MA': 7.0,
                    'TN': 6.8, 'IN': 6.7, 'MO': 6.1, 'MD': 6.0, 'WI': 5.8,
                    'CO': 5.7, 'MN': 5.6, 'SC': 5.1, 'AL': 5.0, 'LA': 4.7,
                    'KY': 4.5, 'OR': 4.2, 'OK': 4.0, 'CT': 3.6, 'UT': 3.2,
                    'IA': 3.2, 'NV': 3.1, 'AR': 3.0, 'MS': 3.0, 'KS': 2.9,
                    'NM': 2.1, 'NE': 1.9, 'WV': 1.8, 'ID': 1.8, 'HI': 1.4,
                    'NH': 1.4, 'ME': 1.3, 'MT': 1.1, 'RI': 1.1, 'DE': 1.0,
                    'SD': 0.9, 'ND': 0.8, 'AK': 0.7, 'VT': 0.6, 'WY': 0.6
                };
                
                return (statePopulations[stateCode] || 1) * 1000000;
            }
            
            // Helper function to capitalize first letter
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            
            // Search again button handler
            searchAgainBtn.addEventListener('click', function() {
                resultContainer.style.display = 'none';
                nameForm.reset();
                nameForm.classList.remove('was-validated');
                document.getElementById('firstName').focus();
            });
        });









        // Author Box JavaScript Functionality

// Configuration object for easy customization
const authorConfig = {
  name: "Your Name",
  bio: "Expert tool site creator with over 5 years of experience building innovative web applications and digital solutions. I specialize in creating user-friendly tools that solve real-world problems and enhance productivity. From simple utilities to complex web applications, I'm passionate about crafting digital experiences that make a difference.",
  avatar: "https://via.placeholder.com/100x100/4f46e5/ffffff?text=YN",
  linkedin: "https://linkedin.com/in/yourprofile",
  facebook: "https://facebook.com/yourprofile",
}

// Initialize the author box when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  //initializeAuthorBox() //
  addAnimations()
  setupSocialTracking()
    })

// Initialize author box with configuration
//function initializeAuthorBox() {
  //const authorName = document.getElementById("authorName")
  //const authorBio = document.getElementById("authorBio")
  //const authorAvatar = document.getElementById("authorAvatar")
  //const linkedinBtn = document.getElementById("linkedinBtn")
  //const facebookBtn = document.getElementById("facebookBtn")

  //if (authorName) authorName.textContent = authorConfig.name
  //if (authorBio) authorBio.textContent = authorConfig.bio
  //if (authorAvatar) authorAvatar.src = authorConfig.avatar
  //if (linkedinBtn) linkedinBtn.href = authorConfig.linkedin
  //if (facebookBtn) facebookBtn.href = authorConfig.facebook


// Add fade-in animations to elements
function addAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe author box
  const authorBox = document.querySelector(".author-box")
  if (authorBox) {
    observer.observe(authorBox)
  }
}

// Track social media clicks
function setupSocialTracking() {
  const socialButtons = document.querySelectorAll(".social-btn")

  socialButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const platform = this.textContent.trim().split("\n")[0]
      console.log(`Social link clicked: ${platform}`)

      // Add click animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })
}

// Show contact form (placeholder function)
function showContactForm() {
  // You can integrate this with a modal or redirect to contact page
  alert("Contact form would open here. You can integrate this with a modal or contact page.")

  // Example of how you might show a Bootstrap modal
  // const contactModal = new bootstrap.Modal(document.getElementById('contactModal'));
  // contactModal.show();
}

// Update author information dynamically
function updateAuthorInfo(newConfig) {
  Object.assign(authorConfig, newConfig)
  initializeAuthorBox()
}

// Utility function to generate avatar with initials
function generateAvatarUrl(name, bgColor = "4f46e5", textColor = "ffffff") {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
  return `https://via.placeholder.com/100x100/${bgColor}/${textColor}?text=${initials}`
}

// Example usage:
// updateAuthorInfo({
//     name: "John Doe",
//     bio: "Senior Full-Stack Developer...",
//     avatar: generateAvatarUrl("John Doe"),
//     linkedin: "https://linkedin.com/in/johndoe",
//     facebook: "https://facebook.com/johndoe"
// });

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add loading states for social buttons
function addLoadingState(button) {
  const originalContent = button.innerHTML
  button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...'
  button.disabled = true

  setTimeout(() => {
    button.innerHTML = originalContent
    button.disabled = false
  }, 1000)
}
