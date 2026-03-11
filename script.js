document.addEventListener('DOMContentLoaded', function() {

    const toggle = document.getElementById('billingToggle');
    if (!toggle) return;

    const monthlyLabel = document.getElementById('monthlyLabel');
    const yearlyLabel = document.getElementById('yearlyLabel');

    const plans = [
        {
            name: 'Starter',
            subtitle: 'Perfect for new writers',
            monthlyPrice: 0,
            yearlyPrice: 0,
            features: [
                'Write up to 3 blog posts',
                'Basic blog editor',
                'Standard publishing',
                'Community visibility'
            ],
            popular: false
        },
        {
            name: 'Pro',
            subtitle: 'For serious content creators',
            monthlyPrice: 19.99,
            yearlyPrice: 199.99,
            features: [
                'Unlimited blog posts',
                'Mark posts as Featured ⭐',
                'Priority content visibility',
                'Advanced analytics',
                'Custom profile branding'
            ],
            popular: true
        },
        {
            name: 'Enterprise',
            subtitle: 'For professional publishing teams',
            monthlyPrice: 49.99,
            yearlyPrice: 499.99,
            features: [
                'Everything in Pro',
                'Team collaboration',
                'Advanced analytics dashboard',
                'API access',
                'Priority support'
            ],
            popular: false
        }
    ];

    const cardsContainer = document.getElementById('pricingCards');
    const user = JSON.parse(localStorage.getItem('user'));

    function renderCards(isYearly) {

        cardsContainer.innerHTML = '';

        plans.forEach(plan => {

            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const period = isYearly ? '/year' : '/month';
            const priceDisplay = price === 0 ? 'Free' : `$${price.toFixed(2)}`;

            let buttonText = 'Upgrade';
            let disabled = false;

            if (user) {
                if (user.plan === plan.name) {
                    buttonText = 'Current Plan';
                    disabled = true;
                } 
                else if (
                    user.plan === 'Enterprise' ||
                    (user.plan === 'Pro' && plan.name === 'Starter')
                ) {
                    buttonText = 'Downgrade Not Allowed';
                    disabled = true;
                }
            }

            const card = document.createElement('div');
            card.className = `card ${plan.popular ? 'popular' : ''}`;

            const popularBadge = plan.popular
                ? '<div class="popular-badge">Most Popular</div>'
                : '';

            const featuresHTML = plan.features
                .map(f => `<li>${f}</li>`)
                .join('');

            card.innerHTML = `
                ${popularBadge}
                <h2>${plan.name}</h2>
                <div class="subtitle">${plan.subtitle}</div>
                <div class="price">${priceDisplay}<span>${period}</span></div>
                <ul class="features">${featuresHTML}</ul>
                <button class="upgrade-btn"
                    data-plan="${plan.name}"
                    ${disabled ? 'disabled' : ''}>
                    ${buttonText}
                </button>
            `;

            cardsContainer.appendChild(card);
        });

        attachUpgradeEvents();
    }

    function attachUpgradeEvents() {
        const buttons = document.querySelectorAll('.upgrade-btn');

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const selectedPlan = this.getAttribute('data-plan');
                window.location.href = `payment.html?plan=${selectedPlan}`;
            });
        });
    }

    toggle.addEventListener('change', function(e) {

        const isYearly = e.target.checked;

        renderCards(isYearly);

        if (isYearly) {
            yearlyLabel.classList.add('active');
            monthlyLabel.classList.remove('active');
        } else {
            monthlyLabel.classList.add('active');
            yearlyLabel.classList.remove('active');
        }
    });

    renderCards(false);
});