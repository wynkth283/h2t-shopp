<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->text('slug');
            $table->string('price');
            $table->text('image');
            $table->text('description');
            $table->integer('quantity');
            $table->integer('sold');
            
            $table->string('category_id');
            $table->string('brand_id');
            $table->string('province_id');
            $table->string('status');
            $table->string('view_count');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
