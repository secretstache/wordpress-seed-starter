<?php

namespace App\Objects;

/**
 * Add Testimonial CPT
 */
add_action( 'init', function() {

    register_extended_post_type( "ssm_testimonial", [

        "capability_type"   => "page",
        "menu_icon"         => "dashicons-testimonial",
        "menu_position"		=> 5,
        "supports" 			=> ["title"],
        "show_in_menu"      => "ssm",
        "has_archive"       => false,
        "public"            => false,
        "show_ui"           => true,
        "show_in_rest"      => true,


        "labels"            => [
            "all_items"     => "Testimonials",
        ],

        "admin_cols"        => [ // admin posts list columns
            "title"
        ],

    ], [

        "singular"  => "Testimonial",
        "plural"    => "Testimonials",
        "slug"      => "testimonial"

    ] );

});
