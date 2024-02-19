document.addEventListener("DOMContentLoaded", function () {
    const seatButtons = document.querySelectorAll('.all-btn');
    const applyButton = document.querySelector('#discount-section button');
    const couponInput = document.querySelector('#discount-section input');
    const seatCountDisplay = document.getElementById('seat-count');
    const totalSeatDisplay = document.getElementById('total-seat');
    const totalPriceDisplay = document.getElementById('total-price');
    const grandPriceDisplay = document.getElementById('grand-price');
    
    let selectedSeats = [];
    let totalSeatLeft = 40;
    let totalPrice = 0; 
    let grandTotal = 0;
 
    function updateSeatCount() {
        seatCountDisplay.textContent = selectedSeats.length;
        totalSeatDisplay.textContent = totalSeatLeft - selectedSeats.length;
    }

    function updatePrice() {
        totalPrice = selectedSeats.length * 550; 
        totalPriceDisplay.textContent = totalPrice;
        grandTotal = totalPrice;
        if (couponInput.value === 'NEW15') {
            grandTotal *= 0.85;
        }
        else if(couponInput.value === 'Couple 20'){
            grandTotal *= 0.80;
            grandPriceDisplay.textContent = grandTotal;
        }
        grandPriceDisplay.textContent = grandTotal;
    }

    for(const button of seatButtons) {
        button.addEventListener('click', function () {
            if (!selectedSeats.includes(button.textContent)) {
                if (selectedSeats.length < 4) {
                    selectedSeats.push(button.textContent);
                    button.classList.add('bg-[#1DD100]');
                    updateSeatCount();
                    updatePrice();
                } else {
                    alert('You can select a maximum of 4 seats.');
                }
            } else {
                selectedSeats = selectedSeats.filter(seat => seat !== button.textContent);
                button.classList.remove('bg-[#1DD100]');
                updateSeatCount();
                updatePrice();
            }
            if (selectedSeats.length > 0) {
                applyButton.disabled = false;
            } else {
                applyButton.disabled = true;
            }
        });
    }
    
    applyButton.addEventListener('click', function () {
        if (couponInput.value === 'NEW15') {
            grandTotal *= 0.85; 
            grandPriceDisplay.textContent = grandTotal;
        } 
        else if(couponInput.value === 'Couple 20'){
            grandTotal *= 0.80;
            grandPriceDisplay.textContent = grandTotal;
        }
        else {
            alert('Invalid coupon code.');
        }
        couponInput.value = ''; 
    });
});