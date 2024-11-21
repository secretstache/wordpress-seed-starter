<?php

/**
 * SSM Theme Boilerplate
 */

namespace App;

/**
 * Add SSM menu item
 */
add_action( 'admin_menu', function () {

    add_menu_page(
        "Secret Stache",
        "Secret Stache",
        "manage_options",
        "ssm",
        "",
        "dashicons-layout",
        5
    );

});

/**
 * Remove first SSM submenu item
 */
add_action( 'admin_init', function () {
    remove_submenu_page("ssm", "ssm");
}, 99);

/**
 * Create SSM Menu sub items
 */
add_action( 'init', function() {

    if( class_exists("acf") ) {

        // Add Brand Settings Page
        acf_add_options_sub_page( array(
            "page_title"  => "Brand Settings",
            "menu_title"  => "Brand Settings",
            "parent_slug" => "ssm",
		));

        acf_add_options_sub_page(array(
            "page_title"  => "Core Settings",
            "menu_title"  => "Core",
            "parent_slug" => "options-general.php",
        ));

    }

});

/**
 * Modified Post Excerpt
 */
add_filter('excerpt_more', function( $more ) {
    global $post;
    return '…';
});

add_filter( 'excerpt_length', function( $length ) {
	return 25;
});

/**
 * Assign custom Page Post States
 */
add_filter( 'display_post_states', function( $post_states, $post ) {

    if( get_page_template_slug( $post ) == 'template-legal-page.blade.php' ) {
        $post_states[] = 'Legal Page';
    }

    if( get_page_template_slug( $post ) == 'template-design-system-archive-page.blade.php' ) {
        $post_states[] = 'Sandbox Archive Page';
    }

    return $post_states;

 }, 10, 2 );

/**
 * Remove Console Error - "SyntaxError: Unexpected number."
 */
add_action('init', function () {
    remove_filter('script_loader_tag', 'Roots\\Soil\\CleanUp\\clean_script_tag');
});

/**
* Disable Removing P tags on images
*/
add_filter( 'ssm_disable_image_tags', function( $content ) {
    return false;
}, 10 );

/**
 * Remove unnecessary item from Admin Bar Menu
 */
add_action( 'admin_bar_menu', function( $wp_admin_bar ) {
    $wp_admin_bar->remove_node( 'wpengine_adminbar' );
}, 999 );

/**
 * Modified Sitemap - Yoast SEO
 */
add_filter( 'wpseo_sitemap_exclude_taxonomy', function( $value, $taxonomy ) {

    $exclude = []; // Taxonomy Slug;

    if( in_array( $taxonomy, $exclude ) ) return true;

}, 10, 2 );

add_filter( 'wpseo_sitemap_exclude_post_type', function( $value, $post_type ) {
    if ( $post_type == 'ssm_design_system' ) return true;
}, 10, 2 );

add_filter( 'wpseo_sitemap_exclude_author', function( $value ) {
    return [];
});

add_action('wp_dashboard_setup', function() {
    remove_meta_box('wpseo-wincher-dashboard-overview', 'dashboard', 'normal');
});

/**
 * Manage Post Columns
 */
add_filter( 'manage_edit-ssm_design_system_columns', __NAMESPACE__ . '\\manage_admin_columns', 10);

function manage_admin_columns( $columns ) {

    unset($columns['wpseo-score']);
    unset($columns['wpseo-score-readability']);
    unset($columns['wpseo-title']);
    unset($columns['wpseo-metadesc']);
    unset($columns['wpseo-focuskw']);
    unset($columns['wpseo-links']);
    unset($columns['wpseo-linked']);
    unset($columns['views']);

    return $columns;

}

/**
 * Append the template name to the label of a layout builder template
 */
add_filter('acf/fields/flexible_content/layout_title/name=templates', __NAMESPACE__ . '\\flexible_content_label', 999, 4);
add_filter('acf/fields/flexible_content/layout_title/name=modules', __NAMESPACE__ . '\\flexible_content_label', 999, 4);

function flexible_content_label($title, $field, $layout, $i)
{

    $label = $layout['label'];

    if ($admin_label = get_sub_field("option_section_label")) {
        $label = stripslashes($admin_label) . " - " . $label;
    }

    if (get_sub_field("option_status") == false) {
        $label = "<span class=\"template-inactive\">Inactive</span> - " . $label;
    }

    return $label;
};

/**
 * Set custom block categories & unset default categories
 */
add_filter('block_categories_all', function ($categories) {

    foreach( get_default_block_categories() as $category ){
        unset($categories[array_search($category['slug'], array_column($categories, 'slug'))]);
    }

    $final_categories = array_merge(
        array(
            array(
                'slug'  => 'ssm-components',
                'title' => 'Components'
            ),
            array(
                'slug'  => 'ssm-templates',
                'title' => 'Templates'
            ),
            array(
                'slug'  => 'ssm-design',
                'title' => 'Design'
            ),
        ),
        $categories
    );

    return $final_categories;
});

if (class_exists('acf')) {

    add_filter( 'admin_body_class', function ( $classes ) {

        $is_active = true;

        $google_fonts_api_key = get_field( 'google_fonts_api_key', 'options' );
        $google_fonts = get_option('google_fonts');

        if( $google_fonts_api_key && !$google_fonts ) {

            $api_url = "https://www.googleapis.com/webfonts/v1/webfonts?key=" . $google_fonts_api_key;

            if( ( $data = json_decode( file_get_contents( $api_url, false, stream_context_create( [ "ssl" => [ "verify_peer" => false, "verify_peer_name" => false ] ] ) ) ) ) && ( $fonts = $data->items ) ) {

                $fetched_fonts = [];

                foreach( $fonts as $font ) {

                    $fetched_fonts[ $font->family ] = [ 'font_family' => $font->family ];

                }

                add_option( 'google_fonts', $fetched_fonts );

            } else {
                $is_active = false;
            }

        }

        $classes .= ( $is_active == false ) ? 'google-fonts-error' : '';

        return $classes;

    }, 99 );

    add_filter('acf/load_field/name=google_font', function( $field ) {

        $google_fonts = get_option('google_fonts');

        if ( is_admin() && $google_fonts ) {

            $field['choices'] = array();

            foreach( $google_fonts as $font_id => $font ) {

                $field['choices'][$font_id] = $font_id;

            }

        }

        return $field;

    });

    add_action( 'wp_head', function() {

        echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
        echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';

        if ( $global_fonts = get_field( 'global_fonts', 'options' ) ) {

            foreach( $global_fonts as $font ) {

                echo '<link href="https://fonts.googleapis.com/css2?family=' . $font['google_font'] . ':ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">';

            }

        }

    });

    add_filter('acf/fields/google_map/api', function($api){
        $api['key'] = get_field( 'google_maps_api_key', 'options' ) ?: '';
        return $api;
    });

}

/**
 * Templates without editor
 *
 */
function ea_disable_editor( $id = false ) {

	$excluded_templates = [
        'template-design-system-archive-page.blade.php'
    ];

	if( empty( $id ) ) return false;

	$template = get_page_template_slug( intval( $id ) );

	return in_array( $template, $excluded_templates );
}

/**
 * Disable Classic Editor by template
 */
add_action( 'admin_head', function() {

	if( $_GET && isset( $_GET['post'] ) && ea_disable_editor( $_GET['post'] ) ) {
		remove_post_type_support( 'page', 'editor' );
	}

} );

/**
 * Disable Gutenberg by template
 */
add_filter( 'use_block_editor_for_post_type', function( $can_edit, $post_type ) {

	if( $_GET && isset( $_GET['post'] ) && ea_disable_editor( $_GET['post'] ) )
		$can_edit = false;

	return $can_edit;

}, 10, 2 );

/**
 * Register Objects
 */
foreach ( glob( get_template_directory( __FILE__ ) . '/app/Objects/*.php') as $file) {
	require_once( $file );
}

/**
 * Register ACF
 */
foreach( glob( get_template_directory( __FILE__ ) . '/app/Fields/*', GLOB_ONLYDIR ) as $dir ) {

	$namespace = last( explode( "/", $dir ) ); // "Objects"

	if ( count(scandir($dir)) > 2 ) {

		foreach ( glob( $dir . '/*.php' ) as $file) {

			$filename = basename( $file, '.php' ); // "Team"
			$class = "App\\Fields\\{$namespace}\\{$filename}"; // "App\Fields\Objects\Team"

			$$filename = new $class(); // $Team = new App\Fields\Objects\Team

		}

	}

}
