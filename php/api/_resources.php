<?php
// Config-driven definition of every content type the admin panel can manage.
// One generic CRUD engine (admin/index.php) + one generic public API
// (api/content.php) work off this single source of truth, instead of writing
// bespoke code for each of the ten resource types.
declare(strict_types=1);

// Field types: text | textarea | json | boolean | date | number | select
// helpText appears under the field in the admin form.
$jsonHelp = [
    'stringArray' => 'JSON array of strings, e.g. ["First item", "Second item"]',
    'qaArray' => 'JSON array of {"question","answer"}, e.g. [{"question":"Q?","answer":"A."}]',
    'itineraryArray' => 'JSON array of {"day","description"}, e.g. [{"day":"Day 1","description":"Arrival."}]',
    'nameDescArray' => 'JSON array of {"name","description"}, e.g. [{"name":"Standard Visa","description":"..."}]',
    'paragraphArray' => 'JSON array of paragraph strings, e.g. ["First paragraph.", "Second paragraph."]',
];

/**
 * @return array<string, array{
 *   label:string, singular:string, table:string, hasSlug:bool, titleField:string,
 *   listColumns:string[], fields:array<array{name:string,label:string,type:string,required?:bool,options?:string[],helpText?:string}>
 * }>
 */
function ab_resources(): array
{
    global $jsonHelp;
    static $r = null;
    if ($r !== null) {
        return $r;
    }
    return $r = [
        'offices' => [
            'label' => 'Offices / Locations', 'singular' => 'Office', 'table' => 'ab_offices',
            'hasSlug' => true, 'titleField' => 'city', 'listColumns' => ['city', 'slug', 'published'],
            'fields' => [
                ['name' => 'slug', 'label' => 'Slug', 'type' => 'text', 'required' => true, 'helpText' => 'URL path, e.g. lahore'],
                ['name' => 'city', 'label' => 'City', 'type' => 'text', 'required' => true],
                ['name' => 'address', 'label' => 'Address', 'type' => 'textarea', 'required' => true],
                ['name' => 'phone', 'label' => 'Phone', 'type' => 'text', 'required' => true],
                ['name' => 'hours', 'label' => 'Business Hours', 'type' => 'text', 'required' => true],
                ['name' => 'map_url', 'label' => 'Google Maps URL', 'type' => 'text', 'required' => true],
                ['name' => 'opening_date', 'label' => 'Opening Date (leave blank if already open)', 'type' => 'date'],
                ['name' => 'intro', 'label' => 'Intro Paragraph', 'type' => 'textarea'],
                ['name' => 'local_context', 'label' => 'Local Context Paragraph', 'type' => 'textarea'],
                ['name' => 'services_offered', 'label' => 'Services Offered', 'type' => 'json', 'helpText' => $jsonHelp['stringArray']],
                ['name' => 'sort_order', 'label' => 'Sort Order', 'type' => 'number'],
                ['name' => 'published', 'label' => 'Published', 'type' => 'boolean'],
            ],
        ],
        'countries' => [
            'label' => 'Visa Countries', 'singular' => 'Country', 'table' => 'ab_countries',
            'hasSlug' => true, 'titleField' => 'name', 'listColumns' => ['name', 'slug', 'featured', 'published'],
            'fields' => [
                ['name' => 'slug', 'label' => 'Slug', 'type' => 'text', 'required' => true],
                ['name' => 'name', 'label' => 'Country Name', 'type' => 'text', 'required' => true],
                ['name' => 'flag_emoji', 'label' => 'Flag Emoji (fallback)', 'type' => 'text'],
                ['name' => 'flag_image', 'label' => 'Flag Image Path', 'type' => 'text'],
                ['name' => 'hero_image', 'label' => 'Hero Image Path', 'type' => 'text'],
                ['name' => 'visa_type', 'label' => 'Visa Type Label', 'type' => 'text', 'required' => true],
                ['name' => 'description', 'label' => 'Short Description', 'type' => 'textarea', 'required' => true],
                ['name' => 'featured', 'label' => 'Featured on Homepage', 'type' => 'boolean'],
                ['name' => 'meta_title', 'label' => 'SEO Meta Title', 'type' => 'text'],
                ['name' => 'meta_description', 'label' => 'SEO Meta Description', 'type' => 'textarea'],
                ['name' => 'intro', 'label' => 'Intro Paragraph', 'type' => 'textarea'],
                ['name' => 'who_can_apply', 'label' => 'Who Can Apply', 'type' => 'json', 'helpText' => $jsonHelp['stringArray']],
                ['name' => 'visa_types', 'label' => 'Visa Types', 'type' => 'json', 'helpText' => $jsonHelp['nameDescArray']],
                ['name' => 'documents', 'label' => 'Required Documents', 'type' => 'json', 'helpText' => $jsonHelp['stringArray']],
                ['name' => 'financial_note', 'label' => 'Financial Note', 'type' => 'textarea'],
                ['name' => 'processing_time', 'label' => 'Processing Time', 'type' => 'textarea'],
                ['name' => 'steps', 'label' => 'Application Steps', 'type' => 'json', 'helpText' => $jsonHelp['stringArray']],
                ['name' => 'refusal_reasons', 'label' => 'Common Refusal Reasons', 'type' => 'json', 'helpText' => $jsonHelp['stringArray']],
                ['name' => 'faqs', 'label' => 'FAQs', 'type' => 'json', 'helpText' => $jsonHelp['qaArray']],
                ['name' => 'sort_order', 'label' => 'Sort Order', 'type' => 'number'],
                ['name' => 'published', 'label' => 'Published', 'type' => 'boolean'],
            ],
        ],
        'refusal_pages' => [
            'label' => 'Visa Refusal Pages', 'singular' => 'Refusal Page', 'table' => 'ab_refusal_pages',
            'hasSlug' => true, 'titleField' => 'country', 'listColumns' => ['country', 'slug', 'published'],
            'fields' => [
                ['name' => 'slug', 'label' => 'Slug', 'type' => 'text', 'required' => true],
                ['name' => 'country', 'label' => 'Country Name', 'type' => 'text', 'required' => true],
                ['name' => 'meta_title', 'label' => 'SEO Meta Title', 'type' => 'text'],
                ['name' => 'meta_description', 'label' => 'SEO Meta Description', 'type' => 'textarea'],
                ['name' => 'intro', 'label' => 'Intro Paragraph', 'type' => 'textarea', 'required' => true],
                ['name' => 'common_reasons', 'label' => 'Common Reasons', 'type' => 'json', 'required' => true, 'helpText' => $jsonHelp['stringArray']],
                ['name' => 'what_we_review', 'label' => 'What We Review', 'type' => 'json', 'required' => true, 'helpText' => $jsonHelp['stringArray']],
                ['name' => 'special_note', 'label' => 'Special Note (optional)', 'type' => 'textarea'],
                ['name' => 'faqs', 'label' => 'FAQs', 'type' => 'json', 'required' => true, 'helpText' => $jsonHelp['qaArray']],
                ['name' => 'sort_order', 'label' => 'Sort Order', 'type' => 'number'],
                ['name' => 'published', 'label' => 'Published', 'type' => 'boolean'],
            ],
        ],
        'service_pages' => [
            'label' => 'Visa Consultancy Services', 'singular' => 'Service', 'table' => 'ab_service_pages',
            'hasSlug' => true, 'titleField' => 'title', 'listColumns' => ['title', 'slug', 'published'],
            'fields' => [
                ['name' => 'slug', 'label' => 'Slug', 'type' => 'text', 'required' => true],
                ['name' => 'title', 'label' => 'Title', 'type' => 'text', 'required' => true],
                ['name' => 'meta_description', 'label' => 'SEO Meta Description', 'type' => 'textarea'],
                ['name' => 'intro', 'label' => 'Intro Paragraph', 'type' => 'textarea', 'required' => true],
                ['name' => 'highlights', 'label' => 'Highlights', 'type' => 'json', 'required' => true, 'helpText' => $jsonHelp['stringArray']],
                ['name' => 'process', 'label' => 'Process Steps', 'type' => 'json', 'required' => true, 'helpText' => $jsonHelp['stringArray']],
                ['name' => 'faqs', 'label' => 'FAQs', 'type' => 'json', 'required' => true, 'helpText' => $jsonHelp['qaArray']],
                ['name' => 'sort_order', 'label' => 'Sort Order', 'type' => 'number'],
                ['name' => 'published', 'label' => 'Published', 'type' => 'boolean'],
            ],
        ],
        'tours' => [
            'label' => 'Tour Packages', 'singular' => 'Tour', 'table' => 'ab_tours',
            'hasSlug' => true, 'titleField' => 'destination', 'listColumns' => ['destination', 'slug', 'price', 'published'],
            'fields' => [
                ['name' => 'slug', 'label' => 'Slug', 'type' => 'text', 'required' => true],
                ['name' => 'destination', 'label' => 'Destination', 'type' => 'text', 'required' => true],
                ['name' => 'image', 'label' => 'Image Path', 'type' => 'text', 'required' => true, 'helpText' => '/destinations/uk.jpg'],
                ['name' => 'duration', 'label' => 'Duration', 'type' => 'text', 'required' => true, 'helpText' => '6 Days / 5 Nights'],
                ['name' => 'departure', 'label' => 'Departure Label', 'type' => 'text', 'required' => true],
                ['name' => 'price', 'label' => 'Price', 'type' => 'text', 'required' => true, 'helpText' => 'PKR 620,000'],
                ['name' => 'visa_assistance', 'label' => 'Visa Assistance Included', 'type' => 'boolean'],
                ['name' => 'summary', 'label' => 'Summary', 'type' => 'textarea', 'required' => true],
                ['name' => 'highlights', 'label' => 'Highlights', 'type' => 'json', 'required' => true, 'helpText' => $jsonHelp['stringArray']],
                ['name' => 'included', 'label' => "What's Included", 'type' => 'json', 'required' => true, 'helpText' => $jsonHelp['stringArray']],
                ['name' => 'excluded', 'label' => "What's Not Included", 'type' => 'json', 'required' => true, 'helpText' => $jsonHelp['stringArray']],
                ['name' => 'itinerary', 'label' => 'Day-by-Day Itinerary', 'type' => 'json', 'required' => true, 'helpText' => $jsonHelp['itineraryArray']],
                ['name' => 'notes', 'label' => 'Important Notes', 'type' => 'json', 'required' => true, 'helpText' => $jsonHelp['stringArray']],
                ['name' => 'category', 'label' => 'Category', 'type' => 'select', 'options' => ['group', 'customized']],
                ['name' => 'sort_order', 'label' => 'Sort Order', 'type' => 'number'],
                ['name' => 'published', 'label' => 'Published', 'type' => 'boolean'],
            ],
        ],
        'guides' => [
            'label' => 'Blog / Guides', 'singular' => 'Guide', 'table' => 'ab_guides',
            'hasSlug' => true, 'titleField' => 'title', 'listColumns' => ['title', 'category', 'published_date', 'published'],
            'fields' => [
                ['name' => 'slug', 'label' => 'Slug', 'type' => 'text', 'required' => true],
                ['name' => 'title', 'label' => 'Title', 'type' => 'text', 'required' => true],
                ['name' => 'image', 'label' => 'Featured Image Path', 'type' => 'text', 'required' => true],
                ['name' => 'category', 'label' => 'Category', 'type' => 'select', 'required' => true, 'options' => ['Visa Guides', 'Travel Guides', 'Latest Updates']],
                ['name' => 'published_date', 'label' => 'Published Date', 'type' => 'date', 'required' => true],
                ['name' => 'reading_time', 'label' => 'Reading Time', 'type' => 'text', 'helpText' => '6 min read'],
                ['name' => 'excerpt', 'label' => 'Excerpt', 'type' => 'textarea', 'required' => true],
                ['name' => 'content', 'label' => 'Content Paragraphs', 'type' => 'json', 'required' => true, 'helpText' => $jsonHelp['paragraphArray']],
                ['name' => 'published', 'label' => 'Published', 'type' => 'boolean'],
            ],
        ],
        'success_stories' => [
            'label' => 'Success Stories', 'singular' => 'Success Story', 'table' => 'ab_success_stories',
            'hasSlug' => false, 'titleField' => 'country', 'listColumns' => ['country', 'category', 'period', 'published'],
            'fields' => [
                ['name' => 'country', 'label' => 'Country', 'type' => 'text', 'required' => true],
                ['name' => 'category', 'label' => 'Category', 'type' => 'text', 'required' => true],
                ['name' => 'period', 'label' => 'Period', 'type' => 'text', 'required' => true, 'helpText' => '2026'],
                ['name' => 'summary', 'label' => 'Summary', 'type' => 'textarea', 'required' => true],
                ['name' => 'sort_order', 'label' => 'Sort Order', 'type' => 'number'],
                ['name' => 'published', 'label' => 'Published', 'type' => 'boolean'],
            ],
        ],
        'videos' => [
            'label' => 'Video Library', 'singular' => 'Video', 'table' => 'ab_videos',
            'hasSlug' => false, 'titleField' => 'title', 'listColumns' => ['title', 'category', 'published'],
            'fields' => [
                ['name' => 'title', 'label' => 'Title', 'type' => 'text', 'required' => true],
                ['name' => 'category', 'label' => 'Category', 'type' => 'text', 'required' => true],
                ['name' => 'duration', 'label' => 'Duration', 'type' => 'text', 'helpText' => '8:42'],
                ['name' => 'youtube_url', 'label' => 'YouTube URL', 'type' => 'text'],
                ['name' => 'thumbnail', 'label' => 'Thumbnail Path', 'type' => 'text'],
                ['name' => 'sort_order', 'label' => 'Sort Order', 'type' => 'number'],
                ['name' => 'published', 'label' => 'Published', 'type' => 'boolean'],
            ],
        ],
        'faqs' => [
            'label' => 'General FAQs', 'singular' => 'FAQ', 'table' => 'ab_faqs',
            'hasSlug' => false, 'titleField' => 'question', 'listColumns' => ['question', 'published'],
            'fields' => [
                ['name' => 'question', 'label' => 'Question', 'type' => 'text', 'required' => true],
                ['name' => 'answer', 'label' => 'Answer', 'type' => 'textarea', 'required' => true],
                ['name' => 'sort_order', 'label' => 'Sort Order', 'type' => 'number'],
                ['name' => 'published', 'label' => 'Published', 'type' => 'boolean'],
            ],
        ],
        'team_members' => [
            'label' => 'Team Members', 'singular' => 'Team Member', 'table' => 'ab_team_members',
            'hasSlug' => false, 'titleField' => 'name', 'listColumns' => ['name', 'role', 'published'],
            'fields' => [
                ['name' => 'name', 'label' => 'Name', 'type' => 'text', 'required' => true],
                ['name' => 'role', 'label' => 'Role', 'type' => 'text', 'required' => true],
                ['name' => 'photo', 'label' => 'Photo Path', 'type' => 'text'],
                ['name' => 'bio', 'label' => 'Bio', 'type' => 'textarea'],
                ['name' => 'sort_order', 'label' => 'Sort Order', 'type' => 'number'],
                ['name' => 'published', 'label' => 'Published', 'type' => 'boolean'],
            ],
        ],
    ];
}

/** Columns that are JSON-typed for a given resource (used to json_decode after SELECT). */
function ab_resource_json_fields(array $resource): array
{
    return array_values(array_map(fn($f) => $f['name'], array_filter($resource['fields'], fn($f) => $f['type'] === 'json')));
}

function ab_resource_boolean_fields(array $resource): array
{
    return array_values(array_map(fn($f) => $f['name'], array_filter($resource['fields'], fn($f) => $f['type'] === 'boolean')));
}
