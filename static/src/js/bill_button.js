/** @odoo-module */
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { Component } from "@odoo/owl";
import { OrderReceipt } from "@point_of_sale/app/screens/receipt_screen/receipt/order_receipt";
import { useService } from "@web/core/utils/hooks";
import { useAsyncLockedMethod } from "@point_of_sale/app/utils/hooks";
import { PrintBillButton } from "@pos_restaurant/app/control_buttons/print_bill_button/print_bill_button";

// Patching the PrintBillButton prototype to modify the click method
patch(PrintBillButton.prototype, {
    setup() {
        this.pos = usePos();
        this.printer = useService("printer");
        this.click = useAsyncLockedMethod(this.click);
    },

    // Overriding the click method to print the order receipt
    async click() {
        // Need to await to have the result in case of automatic skip screen.
        (await this.printer.print(OrderReceipt, {
            data: this.pos.get_order().export_for_printing(),
            formatCurrency: this.env.utils.formatCurrency,
        })) || this.pos.showTempScreen("BillScreen");
    },
});

// Add the print bill button control without the restaurant condition
ProductScreen.addControlButton({
    component: PrintBillButton,
    condition: function () {
        // Always return true to display the button regardless of restaurant module
        return true;
    },
});

// /** @odoo-module */
// import { usePos } from "@point_of_sale/app/store/pos_hook";
// import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
// import { Component } from "@odoo/owl";
// import { OrderReceipt } from "@point_of_sale/app/screens/receipt_screen/receipt/order_receipt";
// import { useService } from "@web/core/utils/hooks";
// import { useAsyncLockedMethod } from "@point_of_sale/app/utils/hooks";
// import { PrintBillButton }from "@pos_restaurant/app/control_buttons/print_bill_button/print_bill_button"
// patch(PrintBillButton.prototype, {
//     setup() {
//         this.pos = usePos();
//         this.printer = useService("printer");
//         this.click = useAsyncLockedMethod(this.click);
//     },
//     async click() {
//     // Need to await to have the result in case of automatic skip screen.
//     (await this.printer.print(OrderReceipt, {
//         data: this.pos.get_order().export_for_printing(),
//         formatCurrency: this.env.utils.formatCurrency,
//     })) || this.pos.showTempScreen("BillScreen");
// }

// })



// ProductScreen.addControlButton({
//     component: PrintBillButton,
//     condition: function () {
//         return this.pos.config.iface_printbill;
//     },
// });
