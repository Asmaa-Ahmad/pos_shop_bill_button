
{
    "name"          :   "POS Shop Bill Button",
    "summary"       :   """POS Shop Bill Button """,
    "category"      :   "Point of Sale",
    "version"       :   "1.0.0",
    "author"        :   " Asmaa Ahmad",
    "license"       :   "Other proprietary",
    "description"   :   """POS shop Bill Button""",
    "depends"       :   ['point_of_sale'],
    "data"          :   [
            'views/bill_button.xml',
        ],
    'assets'        :   {
                            'point_of_sale._assets_pos': [
                                "/pos_bill_printer/static/src/js/bill_button.js",
                                # "/pos_bill_printer/static/src/xml/bill_button.xml",
                            ],
                        },
    "application"   :   True,
    "installable"   :   True,
    "auto_install"  :   False,
}